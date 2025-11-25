import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Search, Refresh, Edit, Delete } from '@mui/icons-material';
import * as UI from '../components/ui';
import { usuarioService } from '../services/usuarioService';
import type { Usuario } from '../services/types';

export const UsuarioPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [enviando, setEnviando] = useState(false);

  // Carregar usuários
  const carregarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await usuarioService.getAll();
      
      // Debug para ver a estrutura real
      console.log('Resposta do usuário service:', response);
      
      // Tente diferentes estruturas de resposta
      let usuariosData = [];
      
      if (response.usuarios) {
        usuariosData = response.usuarios;
      } else if (response.data && Array.isArray(response.data)) {
        usuariosData = response.data;
      } else if (response.data && response.data.usuarios) {
        usuariosData = response.data.usuarios;
      } else if (Array.isArray(response)) {
        usuariosData = response;
      }
      
      setUsuarios(usuariosData);
      setError('');
    } catch (error) {
      console.error('Erro:', error);
      setError('Falha ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Buscar usuários por nome
  const buscarUsuarios = async () => {
    if (!searchTerm.trim()) {
      carregarUsuarios();
      return;
    }

    try {
      const response = await usuarioService.search(searchTerm);
      setUsuarios(response.data.usuarios || []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setError('Erro ao buscar usuários');
    }
  };

  // Deletar usuário
  const deletarUsuario = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      await usuarioService.delete(id);
      carregarUsuarios();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao excluir usuário');
    }
  };

  // Abrir/fechar modal de cadastro
  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      endereco: ''
    });
  };

  // Abrir/fechar modal de edição
  const abrirModalEdicao = async (id: number) => {
    try {
      const response = await usuarioService.getById(id);
      
      // Tente diferentes estruturas de resposta
      let usuario;
      if (response.usuario) {
        usuario = response.usuario;
      } else if (response.data && response.data.usuario) {
        usuario = response.data.usuario;
      } else if (response.data) {
        usuario = response.data;
      } else {
        usuario = response;
      }

      console.log('Usuário carregado para edição:', usuario); // Para debug

      setUsuarioEditando(usuario);
      setFormData({
        nome: usuario.nome || '',
        email: usuario.email || '',
        telefone: usuario.telefone || '',
        endereco: usuario.endereco || ''
      });
      setModalEdicaoAberto(true);
    } catch (error) {
      console.error('Erro ao carregar usuário para edição:', error);
      alert('Erro ao carregar dados do usuário');
    }
  };

  const fecharModalEdicao = () => {
    setModalEdicaoAberto(false);
    setUsuarioEditando(null);
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      endereco: ''
    });
  };

  // Manipular mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submeter formulário de cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await usuarioService.create(formData);
      carregarUsuarios();
      fecharModal();
      alert('Usuário cadastrado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      alert(error.response?.data?.error || 'Erro ao cadastrar usuário');
    } finally {
      setEnviando(false);
    }
  };

  // Submeter formulário de edição
  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioEditando) return;

    setEnviando(true);

    try {
      await usuarioService.update(usuarioEditando.id, formData);
      carregarUsuarios();
      fecharModalEdicao();
      alert('Usuário atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao editar:', error);
      alert(error.response?.data?.error || 'Erro ao editar usuário');
    } finally {
      setEnviando(false);
    }
  };

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
        <Box className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <TextField
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && buscarUsuarios()}
            size="small"
            sx={{ width: { xs: '100%', sm: 256 } }}
          />
          <Box className="flex gap-2">
            <UI.Button
              onClick={buscarUsuarios}
              startIcon={<Search />}
              variant="outlined"
            >
              Buscar
            </UI.Button>
            <UI.Button
              onClick={carregarUsuarios}
              startIcon={<Refresh />}
              variant="outlined"
              color="secondary"
            >
              Limpar
            </UI.Button>
          </Box>
        </Box>
        <UI.Button
          onClick={abrirModal}
          startIcon={<Add />}
          className="font-semibold"
        >
          Novo Usuário
        </UI.Button>
      </Box>

      {/* Alert de Erro */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Total de Usuários
              </Typography>
              <Typography variant="h4" component="div">
                {usuarios.length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
      </Grid>

      {/* Grid de Usuários */}
      <Grid container spacing={3}>
        {usuarios.length === 0 ? (
          <Grid item xs={12}>
            <Box className="text-center py-12">
              <Typography variant="h6" color="textSecondary">
                Nenhum usuário encontrado
              </Typography>
            </Box>
          </Grid>
        ) : (
          usuarios.map(usuario => (
            <Grid item xs={12} sm={6} md={4} key={usuario.id}>
              <UI.Card hover>
                <Box className="flex justify-between items-start mb-3">
                  <Typography variant="h6" component="h3" className="pr-2">
                    {usuario.nome}
                  </Typography>
                  <Chip
                    label="Ativo"
                    color="success"
                    size="small"
                  />
                </Box>

                <Box className="space-y-2 mb-3">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Email:</strong> {usuario.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Telefone:</strong> {usuario.telefone}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Endereço:</strong> {usuario.endereco}
                  </Typography>
                </Box>

                <Box className="flex gap-2">
                  <UI.Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    startIcon={<Edit />}
                    onClick={() => abrirModalEdicao(usuario.id)}
                    fullWidth
                  >
                    Editar
                  </UI.Button>
                  <UI.Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => deletarUsuario(usuario.id)}
                    fullWidth
                  >
                    Excluir
                  </UI.Button>
                </Box>
              </UI.Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Modal de Cadastro */}
      <UI.Modal
        open={modalAberto}
        onClose={fecharModal}
        title="Cadastrar Novo Usuário"
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <UI.Button onClick={fecharModal} disabled={enviando}>
              Cancelar
            </UI.Button>
            <UI.Button
              onClick={handleSubmit}
              disabled={enviando}
              startIcon={enviando ? <CircularProgress size={16} /> : null}
            >
              {enviando ? 'Cadastrando...' : 'Cadastrar Usuário'}
            </UI.Button>
          </Box>
        }
      >
        <Box className="space-y-3">
          <TextField
            name="nome"
            label="Nome Completo"
            value={formData.nome}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="endereco"
            label="Endereço"
            multiline
            rows={2}
            value={formData.endereco}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
        </Box>
      </UI.Modal>

      {/* Modal de Edição */}
      <UI.Modal
        open={modalEdicaoAberto}
        onClose={fecharModalEdicao}
        title="Editar Usuário"
        actions={
          <Box sx={{ display: 'flex', gap: 1 }}>
            <UI.Button onClick={fecharModalEdicao} disabled={enviando}>
              Cancelar
            </UI.Button>
            <UI.Button
              onClick={handleEditar}
              disabled={enviando}
              startIcon={enviando ? <CircularProgress size={16} /> : null}
            >
              {enviando ? 'Atualizando...' : 'Atualizar Usuário'}
            </UI.Button>
          </Box>
        }
      >
        <Box className="space-y-3">
          <TextField
            name="nome"
            label="Nome Completo"
            value={formData.nome}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="telefone"
            label="Telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="endereco"
            label="Endereço"
            multiline
            rows={2}
            value={formData.endereco}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
        </Box>
      </UI.Modal>
    </Container>
  );
};