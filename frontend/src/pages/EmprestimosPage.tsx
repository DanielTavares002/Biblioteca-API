import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Chip,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  CardContent
} from '@mui/material';
import { Add, Search, Refresh, CheckCircle } from '@mui/icons-material';
import { EmprestimoForm } from '../components/emprestimos/EmprestimoForm';
import { emprestimoService } from '../services/emprestimoService';
import type { Emprestimo } from '../services/types';
import * as UI from '../components/ui';

export const EmprestimosPage: React.FC = () => {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  // Carregar empréstimos
  const carregarEmprestimos = async (ativos?: boolean) => {
    try {
      setLoading(true);
      const response = await emprestimoService.getAll(ativos);
      setEmprestimos(response.emprestimos || []);
      setError('');
    } catch (error) {
      console.error('Erro ao carregar empréstimos:', error);
      setError('Falha ao carregar empréstimos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEmprestimos(tabValue === 0);
  }, [tabValue]);

  const mostrarSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Buscar empréstimos
  const buscarEmprestimos = async () => {
    if (!searchTerm.trim()) {
      carregarEmprestimos(tabValue === 0);
      return;
    }

    try {
      setLoading(true);
      const response = await emprestimoService.getAll(tabValue === 0);
      const emprestimosFiltrados = response.emprestimos.filter(emp => 
        emp.usuario?.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.livro?.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmprestimos(emprestimosFiltrados);
    } catch (error) {
      console.error('Erro na busca:', error);
      setError('Erro ao buscar empréstimos');
    } finally {
      setLoading(false);
    }
  };

  // Criar novo empréstimo
  const handleCriarEmprestimo = async (emprestimoData: { livroId: number; usuarioId: number }) => {
    setEnviando(true);
    try {
      await emprestimoService.create(emprestimoData);
      setFormOpen(false);
      carregarEmprestimos(tabValue === 0);
      mostrarSnackbar('Empréstimo realizado com sucesso!');
    } catch (error: any) {
      mostrarSnackbar(error.response?.data?.error || 'Erro ao realizar empréstimo', 'error');
    } finally {
      setEnviando(false);
    }
  };

  // Devolver livro
  const handleDevolverLivro = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja registrar a devolução deste livro?')) {
      return;
    }

    setEnviando(true);
    try {
      await emprestimoService.devolver(id);
      carregarEmprestimos(tabValue === 0);
      mostrarSnackbar('Livro devolvido com sucesso!');
    } catch (error: any) {
      mostrarSnackbar(error.response?.data?.error || 'Erro ao devolver livro', 'error');
    } finally {
      setEnviando(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const emprestimosAtivos = emprestimos.filter(emp => !emp.devolvido);
  const emprestimosDevolvidos = emprestimos.filter(emp => emp.devolvido);

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Barra de Ações */}
      <Box className="flex flex-col lg:flex-row justify-end items-center gap-4 mb-8">
        <Box className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto order-2 lg:order-1">
          <TextField
            placeholder="Buscar por usuário ou livro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && buscarEmprestimos()}
            size="small"
            sx={{ width: { xs: '100%', sm: 300 } }}
          />
          <Box className="flex gap-2">
            <UI.Button
              onClick={buscarEmprestimos}
              startIcon={<Search />}
              variant="outlined"
            >
              Buscar
            </UI.Button>
            <UI.Button
              onClick={() => {
                setSearchTerm('');
                carregarEmprestimos(tabValue === 0);
              }}
              startIcon={<Refresh />}
              variant="outlined"
              color="secondary"
            >
              Limpar
            </UI.Button>
          </Box>
        </Box>
        <UI.Button
          onClick={() => setFormOpen(true)}
          startIcon={<Add />}
          className="font-semibold order-1 lg:order-2"
        >
          Novo Empréstimo
        </UI.Button>
      </Box>

      {/* Alert de Erro */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Total de Empréstimos
              </Typography>
              <Typography variant="h4" component="div">
                {emprestimos.length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Empréstimos Ativos
              </Typography>
              <Typography variant="h4" component="div" color="primary.main">
                {emprestimosAtivos.length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Devolvidos
              </Typography>
              <Typography variant="h4" component="div" color="success.main">
                {emprestimosDevolvidos.length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <UI.Card hover sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            className="border-b"
          >
            <Tab label={`Empréstimos Ativos (${emprestimosAtivos.length})`} />
            <Tab label={`Todos os Empréstimos (${emprestimos.length})`} />
          </Tabs>
        </CardContent>
      </UI.Card>

      {/* Grid de Empréstimos */}
      <Grid container spacing={3}>
        {emprestimos.length === 0 ? (
          <Grid item xs={12}>
            <Box className="text-center py-12">
              <Typography variant="h6" color="textSecondary">
                {tabValue === 0
                  ? 'Nenhum empréstimo ativo no momento'
                  : 'Nenhum empréstimo encontrado'
                }
              </Typography>
            </Box>
          </Grid>
        ) : (
          emprestimos.map(emprestimo => (
            <Grid item xs={12} md={6} key={emprestimo.id}>
              <UI.Card hover>
                <Box className="flex justify-between items-start mb-3">
                  <Typography variant="h6" component="h3" className="pr-2">
                    {emprestimo.livro?.titulo}
                  </Typography>
                  <Chip
                    label={emprestimo.devolvido ? 'Devolvido' : 'Ativo'}
                    color={emprestimo.devolvido ? 'success' : 'primary'}
                    size="small"
                  />
                </Box>

                <Box className="space-y-2 mb-4">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Usuário:</strong> {emprestimo.usuario?.nome}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Data do Empréstimo:</strong> {formatarData(emprestimo.dataEmprestimo)}
                  </Typography>
                  {emprestimo.dataDevolucao && (
                    <Typography variant="body2" color="textSecondary">
                      <strong>Data de Devolução:</strong> {formatarData(emprestimo.dataDevolucao)}
                    </Typography>
                  )}
                  {emprestimo.dataDevolucaoPrevista && (
                    <Typography variant="body2" color="textSecondary">
                      <strong>Devolução Prevista:</strong> {formatarData(emprestimo.dataDevolucaoPrevista)}
                    </Typography>
                  )}
                </Box>

                <Box className="flex gap-2">
                  {!emprestimo.devolvido && (
                    <UI.Button
                      size="small"
                      variant="outlined"
                      color="success"
                      startIcon={<CheckCircle />}
                      onClick={() => handleDevolverLivro(emprestimo.id!)}
                      fullWidth
                      disabled={enviando}
                    >
                      {enviando ? 'Processando...' : 'Devolver'}
                    </UI.Button>
                  )}
                </Box>
              </UI.Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal de Novo Empréstimo */}
      <EmprestimoForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleCriarEmprestimo}
      />

      {/* Snackbar de Notificação */}
      <UI.Modal
        open={snackbar.open}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        title={snackbar.severity === 'success' ? 'Sucesso' : 'Erro'}
        actions={
          <UI.Button onClick={() => setSnackbar(prev => ({ ...prev, open: false }))}>
            Fechar
          </UI.Button>
        }
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </UI.Modal>
    </Container>
  );
};