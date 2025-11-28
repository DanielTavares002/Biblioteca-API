import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { UsuarioPage } from './pages/UsuarioPage';
import { EmprestimosPage } from './pages/EmprestimosPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ProtectedRoute } from './components/ui/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { Sidebar } from './components/Sidebar';
import { LivrosPage } from './pages/livros/LivrosPag';
import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Search, Refresh, Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import api from './services/api';
import * as UI from './components/ui';

function MainLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Box sx={{ display: 'flex' }}>
      {isAuthenticated && <Sidebar />}

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - 240px)` },
          minHeight: '100vh',
          bgcolor: 'grey.50'
        }}
      >
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/livros" element={<LivrosPage />} />
          <Route path="/usuarios" element={<UsuarioPage />} />
          <Route path="/emprestimos" element={<EmprestimosPage />} />
        </Routes>
      </Box>
    </Box>
  );
}



// Função app principal
function App() {
  return (
    <AuthProvider>
      <Router>
        <Box className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            } />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
}

export default App;