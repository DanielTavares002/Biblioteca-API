import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add, Search, Refresh, Edit, Delete } from '@mui/icons-material';

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

function App() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para o modal de cadastro
  const [modalAberto, setModalAberto] = useState(false);
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
      const response = await axios.get('http://localhost:3000/livros');
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
      const response = await axios.get(`http://localhost:3000/livros/buscar?titulo=${searchTerm}`);
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
      await axios.delete(`http://localhost:3000/livros/${id}`);
      carregarLivros();
    } catch (error) {
      console.error('Erro ao deletar:', error);
      alert('Erro ao excluir livro');
    }
  };

  // Abrir/fechar modal
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

  // Manipular mudanças no formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await axios.post('http://localhost:3000/livros', {
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

  if (loading) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50">
      {/* Header */}
      <Box 
        className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg"
        sx={{ py: 4 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" align="center" fontWeight="bold">
            📚 Biblioteca Digital
          </Typography>
          <Typography variant="h6" align="center" className="text-blue-100 mt-2">
            Sistema de Gerenciamento de Livros
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Barra de Ações */}
        <Box className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
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
              <Button
                variant="contained"
                onClick={buscarLivros}
                startIcon={<Search />}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Buscar
              </Button>
              <Button
                variant="contained"
                onClick={carregarLivros}
                startIcon={<Refresh />}
                className="bg-gray-500 hover:bg-gray-600"
              >
                Limpar
              </Button>
            </Box>
          </Box>
          <Button
            variant="contained"
            onClick={abrirModal}
            startIcon={<Add />}
            className="bg-blue-600 hover:bg-blue-700 font-semibold"
          >
            Novo Livro
          </Button>
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
            <Card>
              <CardContent className="text-center">
                <Typography color="textSecondary" gutterBottom>
                  Total de Livros
                </Typography>
                <Typography variant="h4" component="div">
                  {livros.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent className="text-center">
                <Typography color="textSecondary" gutterBottom>
                  Disponíveis
                </Typography>
                <Typography variant="h4" component="div">
                  {livros.filter(l => l.disponivel).length}
                </Typography>
              </CardContent>
            </Card>
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
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent>
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

                    <CardActions className="flex gap-2 p-0">
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        startIcon={<Edit />}
                        onClick={() => alert(`Editar ${livro.id} - próximo!`)}
                        fullWidth
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => deletarLivro(livro.id)}
                        fullWidth
                      >
                        Excluir
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Modal de Cadastro */}
      <Dialog 
        open={modalAberto} 
        onClose={fecharModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="h2">
            Cadastrar Novo Livro
          </Typography>
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
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
          </DialogContent>

          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button onClick={fecharModal} disabled={enviando}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={enviando}
              startIcon={enviando ? <CircularProgress size={16} /> : null}
            >
              {enviando ? 'Cadastrando...' : 'Cadastrar Livro'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}

export default App;