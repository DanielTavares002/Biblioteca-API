import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  CircularProgress
} from '@mui/material';
import { 
  Book, 
  People, 
  SwapHoriz, 
  Dashboard as DashboardIcon,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface DashboardStats {
  totalLivros: number;
  totalUsuarios: number;
  emprestimosAtivos: number;
  livrosDisponiveis: number;
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalLivros: 0,
    totalUsuarios: 0,
    emprestimosAtivos: 0,
    livrosDisponiveis: 0
  });
  const [loading, setLoading] = useState(true);

  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      
      // Faz todas as requisições em paralelo
      const [livrosResponse, usuariosResponse, emprestimosResponse] = await Promise.all([
        api.get('/livros?limite=1000'),
        api.get('/usuarios?limite=1000'),
        api.get('/emprestimos/ativos')
      ]);

      const livros = livrosResponse.data.livros || [];
      const usuarios = usuariosResponse.data.usuarios || [];
      const emprestimosAtivos = emprestimosResponse.data.emprestimos || [];

      const livrosDisponiveis = livros.filter((livro: any) => livro.disponivel).length;

      setStats({
        totalLivros: livros.length,
        totalUsuarios: usuarios.length,
        emprestimosAtivos: emprestimosAtivos.length,
        livrosDisponiveis
      });

    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const menuItems = [
    {
      title: 'Livros',
      description: 'Gerenciar acervo de livros',
      icon: <Book sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/livros',
      color: '#2196F3',
      stat: stats.totalLivros
    },
    {
      title: 'Usuários',
      description: 'Gerenciar cadastro de usuários',
      icon: <People sx={{ fontSize: 48, color: 'success.main' }} />,
      path: '/usuarios',
      color: '#4CAF50',
      stat: stats.totalUsuarios
    },
    {
      title: 'Empréstimos',
      description: 'Controlar empréstimos e devoluções',
      icon: <SwapHoriz sx={{ fontSize: 48, color: 'warning.main' }} />,
      path: '/emprestimos',
      color: '#FF9800',
      stat: stats.emprestimosAtivos
    }
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <DashboardIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Dashboard da Biblioteca
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Sistema de Gerenciamento Completo
        </Typography>
      </Box>

      {/* Estatísticas Rápidas */}
      <Box sx={{ mt: 8, textAlign: 'center', mb: 6 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Visão Geral do Sistema
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Book sx={{ color: 'primary.main', mr: 2 }} />
                  <Typography color="textSecondary" variant="h6">
                    Total de Livros
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" color="primary.main">
                  {stats.totalLivros}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <People sx={{ color: 'success.main', mr: 2 }} />
                  <Typography color="textSecondary" variant="h6">
                    Usuários Cadastrados
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" color="success.main">
                  {stats.totalUsuarios}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SwapHoriz sx={{ color: 'warning.main', mr: 2 }} />
                  <Typography color="textSecondary" variant="h6">
                    Empréstimos Ativos
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" color="warning.main">
                  {stats.emprestimosAtivos}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%', boxShadow: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 2 }} />
                  <Typography color="textSecondary" variant="h6">
                    Livros Disponíveis
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" color="success.main">
                  {stats.livrosDisponiveis}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Menu de Navegação */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center">
          Módulos do Sistema
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 2 }}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate(item.path)}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {item.icon}
                  </Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                    {item.stat} {item.title.toLowerCase()}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                      background: `linear-gradient(45deg, ${item.color} 30%, ${item.color}99 90%)`,
                      borderRadius: 3
                    }}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};