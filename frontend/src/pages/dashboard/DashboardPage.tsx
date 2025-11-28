import React from 'react';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button 
} from '@mui/material';
import { 
  Book, 
  People, 
  SwapHoriz, 
  Dashboard as DashboardIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLivros: 0,
    totalUsuarios: 0,
    emprestimosAtivos: 0,
    livrosDisponiveis: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarStats = async () => {
      try {
        const data = await dashboardService.getStats();
        setStats(data);
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarStats();
  }, []);

  const menuItems = [
    {
      title: 'Livros',
      description: 'Gerenciar acervo de livros',
      icon: <Book sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/livros',
      color: '#2196F3'
    },
    {
      title: 'Usuários',
      description: 'Gerenciar cadastro de usuários',
      icon: <People sx={{ fontSize: 48, color: 'success.main' }} />,
      path: '/usuarios',
      color: '#4CAF50'
    },
    {
      title: 'Empréstimos',
      description: 'Controlar empréstimos e devoluções',
      icon: <SwapHoriz sx={{ fontSize: 48, color: 'warning.main' }} />,
      path: '/emprestimos',
      color: '#FF9800'
    }
  ];

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

      {/* Menu Grid */}
      <Grid container spacing={4} justifyContent="center">
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
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {item.description}
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

      {/* Estatísticas Rápidas */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Visão Geral
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }} justifyContent="center">
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total de Livros
                </Typography>
                <Typography variant="h4">{stats.totalLivros}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Usuários Cadastrados
                </Typography>
                <Typography variant="h4">{stats.totalUsuarios}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Empréstimos Ativos
                </Typography>
                <Typography variant="h4">{stats.emprestimosAtivos}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};