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
import * as UI from '../../components/ui';
import api from '../../services/api';

// Interface para o Livro
interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  editora: string;
  ano: number;
  disponivel: boolean;
}

export const LivrosPage: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [livroEditando, setLivroEditando] = useState<Livro | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    editora: '',
    ano: ''
  });
  const [enviando, setEnviando] = useState(false);

  // Carregar livros
  const carregarLivros = async () => {
    try {
      setLoading(true);
      const response = await api.get('/livros');
      setLivros(response.data.livros || []);
      setError('');
    } catch (error) {
      console.error('Erro:', error);
      setError('Falha ao carregar livros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  // Buscar livros por título
  const buscarLivros = async () => {
    if (!searchTerm.trim()) {
      carregarLivros();
      return;
    }

    try {
      const response = await api.get(`/livros/buscar?titulo=${searchTerm}`);
      setLivros(response.data.livros || []);
    } catch (error) {
      console.error('Erro na busca:', error);
      setError('Erro ao buscar livros');
    }
  };

  // Deletar livro
  const deletarLivro = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este livro?')) {
      return;
    }

    try {
      await api.delete(`/livros/${id}`);
      carregarLivros();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao excluir livro');
    }
  };

  // Abrir/fechar modal de cadastro
  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setFormData({
      titulo: '',
      autor: '',
      isbn: '',
      editora: '',
      ano: ''
    });
  };

  // Abrir/fechar modal de edição
  const abrirModalEdicao = async (id: number) => {
    try {
      const response = await api.get(`/livros/${id}`);
      const livro = response.data.livro;

      setLivroEditando(livro);
      setFormData({
        titulo: livro.titulo,
        autor: livro.autor,
        isbn: livro.isbn,
        editora: livro.editora,
        ano: livro.ano.toString()
      });
      setModalEdicaoAberto(true);
    } catch (error) {
      console.error('Erro ao carregar livro para edição:', error);
      alert('Erro ao carregar dados do livro');
    }
  };

  const fecharModalEdicao = () => {
    setModalEdicaoAberto(false);
    setLivroEditando(null);
    setFormData({
      titulo: '',
      autor: '',
      isbn: '',
      editora: '',
      ano: ''
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
      await api.post('/livros', {
        ...formData,
        ano: parseInt(formData.ano)
      });

      carregarLivros();
      fecharModal();
      alert('Livro cadastrado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      alert(error.response?.data?.error || 'Erro ao cadastrar livro');
    } finally {
      setEnviando(false);
    }
  };

  // Submeter formulário de edição
  const handleEditar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!livroEditando) return;

    setEnviando(true);

    try {
      await api.put(`/livros/${livroEditando.id}`, {
        ...formData,
        ano: parseInt(formData.ano)
      });

      carregarLivros();
      fecharModalEdicao();
      alert('Livro atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao editar:', error);
      alert(error.response?.data?.error || 'Erro ao editar livro');
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
      {/* Barra de Ações - USANDO NOSSOS COMPONENTES */}
      <Box className="flex flex-col lg:flex-row justify-end items-center gap-4 mb-8">
        <Box className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
          <TextField
            placeholder="Buscar por título..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && buscarLivros()}
            size="small"
            sx={{ width: { xs: '100%', sm: 256 } }}
          />
          <Box className="flex gap-2">
            <UI.Button
              onClick={buscarLivros}
              startIcon={<Search />}
              variant="outlined"
            >
              Buscar
            </UI.Button>
            <UI.Button
              onClick={carregarLivros}
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
          Novo Livro
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
        <Grid item xs={12} sm={6}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Total de Livros
              </Typography>
              <Typography variant="h4" component="div">
                {livros.length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <UI.Card hover>
            <Box className="text-center">
              <Typography color="textSecondary" gutterBottom>
                Disponíveis
              </Typography>
              <Typography variant="h4" component="div">
                {livros.filter(l => l.disponivel).length}
              </Typography>
            </Box>
          </UI.Card>
        </Grid>
      </Grid>

      {/* Grid de Livros */}
      <Grid container spacing={3}>
        {livros.length === 0 ? (
          <Grid item xs={12}>
            <Box className="text-center py-12">
              <Typography variant="h6" color="textSecondary">
                Nenhum livro encontrado
              </Typography>
            </Box>
          </Grid>
        ) : (
          livros.map(livro => (
            <Grid item xs={12} sm={6} md={4} key={livro.id}>
              <UI.Card hover>
                <Box className="flex justify-between items-start mb-3">
                  <Typography variant="h6" component="h3" className="pr-2">
                    {livro.titulo}
                  </Typography>
                  <Chip
                    label={livro.disponivel ? 'Disponível' : 'Indisponível'}
                    color={livro.disponivel ? 'success' : 'error'}
                    size="small"
                  />
                </Box>

                <Box className="space-y-1 mb-3">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Autor:</strong> {livro.autor}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Editora:</strong> {livro.editora}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Ano:</strong> {livro.ano}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>ISBN:</strong> {livro.isbn}
                  </Typography>
                </Box>

                <Box className="flex gap-2">
                  <UI.Button
                    size="small"
                    variant="outlined"
                    color="warning"
                    startIcon={<Edit />}
                    onClick={() => abrirModalEdicao(livro.id)}
                    fullWidth
                  >
                    Editar
                  </UI.Button>
                  <UI.Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => deletarLivro(livro.id)}
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
        title="Cadastrar Novo Livro"
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
              {enviando ? 'Cadastrando...' : 'Cadastrar Livro'}
            </UI.Button>
          </Box>
        }
      >
        <Box className="space-y-3">
          <TextField
            name="titulo"
            label="Título"
            value={formData.titulo}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="autor"
            label="Autor"
            value={formData.autor}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="isbn"
            label="ISBN"
            value={formData.isbn}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="editora"
            label="Editora"
            value={formData.editora}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="ano"
            label="Ano de Publicação"
            type="number"
            value={formData.ano}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
            inputProps={{ min: 1000, max: 2025 }}
          />
        </Box>
      </UI.Modal>

      {/* Modal de Edição */}
      <UI.Modal
        open={modalEdicaoAberto}
        onClose={fecharModalEdicao}
        title="Editar Livro"
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
              {enviando ? 'Atualizando...' : 'Atualizar Livro'}
            </UI.Button>
          </Box>
        }
      >
        <Box className="space-y-3">
          <TextField
            name="titulo"
            label="Título"
            value={formData.titulo}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="autor"
            label="Autor"
            value={formData.autor}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="isbn"
            label="ISBN"
            value={formData.isbn}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="editora"
            label="Editora"
            value={formData.editora}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
          />
          <TextField
            name="ano"
            label="Ano de Publicação"
            type="number"
            value={formData.ano}
            onChange={handleInputChange}
            required
            fullWidth
            margin="dense"
            inputProps={{ min: 1000, max: 2025 }}
          />
        </Box>
      </UI.Modal>
    </Container>
  );
};