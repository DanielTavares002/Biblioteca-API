import api from './api';

export interface Secretario {
     id: number;
    nome: string;
    email: string;
    createdAt?: string;
}

export interface LoginData {
    email: string;
    senha: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    secretario: Secretario;
}

export const authService = {
  async login(loginData: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  },

  async registrar(secretarioData: { nome: string; email: string; senha: string }) {
    const response = await api.post('/auth/registrar', secretarioData);
    return response.data;
  },

  async me(): Promise<{ secretario: Secretario }> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('secretario');
  }
};