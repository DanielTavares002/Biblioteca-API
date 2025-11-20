import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { UsuarioForm } from '../components/usuarios/UsuarioForm';
import { usuarioService } from '../services/usuarioService';
import type { Usuario } from '../services/usuarioService';

export const UsuarioPage: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  
  // Paginação
  const [pagina, setPagina] = useState(0);
  const [limite, setLimite] = useState(10);
  const [total, setTotal] = useState(0);

  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await usuarioService.getAll(pagina + 1, limite);
      setUsuarios(response.usuarios);
      setTotal(response.paginacao.total);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
      mostrarSnackbar('Erro ao carregar usuários', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, [pagina, limite]);

  const mostrarSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCriarUsuario = async (usuarioData: Omit<Usuario, 'id'>) => {
    try {
        await usuarioService.create(usuarioData);
        setFormOpen(false);
        carregarUsuarios();
        mostrarSnackbar('Usuário criado com sucesso!');
    } catch (error: any) {
        mostrarSnackbar(error.response?.data?.error || 'Erro ao criar usuário', 'error');
    }
  };

  const handleEditarUsuario = async (usuarioData: Omit<Usuario, 'id'>) => {
    if (!editingUsuario?.id) return;
    
    try {
      await usuarioService.update(editingUsuario.id, usuarioData);
      setFormOpen(false);
      setEditingUsuario(null);
      carregarUsuarios();
      mostrarSnackbar('Usuário atualizado com sucesso!');
    } catch (error: any) {
      mostrarSnackbar(error.response?.data?.error || 'Erro ao atualizar usuário', 'error');
    }
  };

  const handleDeletarUsuario = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar este usuário?')) {
      return;
    }

    try {
      await usuarioService.delete(id);
      carregarUsuarios();
      mostrarSnackbar('Usuário deletado com sucesso!');
    } catch (error: any) {
      mostrarSnackbar(error.response?.data?.error || 'Erro ao deletar usuário', 'error');
    }
  };

  const handleOpenEdit = (usuario: Usuario) => {
    setEditingUsuario(usuario);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingUsuario(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPagina(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimite(parseInt(event.target.value, 10));
    setPagina(0);
  };

  return (
    <Box className="p-6">
      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="text-gray-800 font-bold">
          Gerenciar Usuários
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Novo Usuário
        </Button>
      </Box>

      <Paper className="shadow-lg rounded-lg">
        <TableContainer>
          <Table>
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="font-semibold">Nome</TableCell>
                <TableCell className="font-semibold">Email</TableCell>
                <TableCell className="font-semibold">Telefone</TableCell>
                <TableCell className="font-semibold">Data Cadastro</TableCell>
                <TableCell className="font-semibold text-center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow 
                  key={usuario.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">{usuario.nome}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell>{usuario.telefone}</TableCell>
                  <TableCell>
                    {usuario.createdAt ? new Date(usuario.createdAt).toLocaleDateString('pt-BR') : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <IconButton
                      onClick={() => handleOpenEdit(usuario)}
                      className="text-blue-600 hover:bg-blue-50"
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeletarUsuario(usuario.id!)}
                      className="text-red-600 hover:bg-red-50"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={limite}
          page={pagina}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) => 
            `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
          }
        />
      </Paper>

      <UsuarioForm
        open={formOpen}
        onClose={handleCloseForm}
        onSave={editingUsuario ? handleEditarUsuario : handleCriarUsuario}
        usuario={editingUsuario}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}