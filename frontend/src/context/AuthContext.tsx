import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { authService } from '../services/authService';
import type { Secretario, LoginData } from '../services/authService';
import api from '../services/api';

interface AuthContextData {
  secretario: Secretario | null;
  loading: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [secretario, setSecretario] = useState<Secretario | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStoredData = async () => {
            const token = localStorage.getItem('token');
            const storedSecretario = localStorage.getItem('secretario');

            if (token && storedSecretario) {
                try {
                    // Verificar se o token ainda é válido
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                    const response = await authService.me();
                    setSecretario(response.secretario);
                } catch (error) {
                    // Token inválido, limpar storage
                    localStorage.removeItem('token');
                    localStorage.removeItem('secretario');
                }
            }
            setLoading(false);
        };

        loadStoredData();
    }, []);

    const login = async (loginData: LoginData) => {
        try {
            console.log('Tentando login com:' loginData);
            const response = await authService.login(loginData);
            console.log('Resposta do login', response);

            const { token, secretario } = response;

            // Salvar no localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('secretario', JSON.stringify(secretario));

            // Configurar header de autenticação
            api.defaults.headers.Authorization = `Bearer ${token}`;

            setSecretario(secretario);
            console.log('Login Realizado com sucesso');
        } catch (error: any) {
            console.error('Erro no login:', error);
            throw new Error(error.response?.data?.error || 'Erro ao fazer login');
        }
    };

    const logout = () => {
        authService.logout();
        setSecretario(null);
        delete api.defaults.headers.Authorization;
    };

    return (
        <AuthContext.Provider value={{
            secretario,
            loading,
            login,
            logout,
            isAuthenticated: !!secretario
        }}>
            {children}
        </AuthContext.Provider>
    );
};