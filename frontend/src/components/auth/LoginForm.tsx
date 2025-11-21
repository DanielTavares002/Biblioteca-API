import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Paper
} from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login({ email, senha });
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper elevation={3} className="p-8 max-w-md w-full">
            <Box className="text-center mb-6">
                <Typography variant="h4" component="h1" className="font-bold text-gray-800">
                    Biblioteca Digital
                </Typography>
                <Typography variant="subtitle1" className="text-gray-600">
                    Acesso Restrito
                </Typography>
            </Box>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <Alert severity="error" className="mb-4">
                        {error}
                    </Alert>
                )}

                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                />

                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                    disabled={loading}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 py-3"
                >
                    {loading ? (
                        <CircularProgress size={24} className="text-white" />
                    ) : (
                        'Entrar'
                    )}
                </Button>
            </form>

            <Box className="mt-6 text-center">
                <Typography variant="body2" className="text-gray-600">
                    Sistema de Gerenciamento de Biblioteca
                </Typography>
            </Box>
        </Paper>
    );
};