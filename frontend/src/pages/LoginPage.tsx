import React from 'react';
import { Box, Container } from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
    return (
        <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center p-4">
            <Container maxWidth="sm" className="flex justify-center">
                <LoginForm />
            </Container>
        </Box>
    );
};