import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem
} from '@mui/material';
import type { Emprestimo } from "../../services/types";
import type { Usuario } from "../../services/types"; 
import type { Livro } from "../../services/types";
import { usuarioService } from '../../services/usuarioService';
import { livroService } from '../../services/livroService';

interface EmprestimoFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (emprestimo: { livroId: number; usuarioId: number }) => void;
    loading?: boolean;
}

export const EmprestimoForm: React.FC<EmprestimoFormProps> = ({
    open,
    onClose,
    onSave,
    loading = false
}) => {
    const [formData, setFormData] = useState({
        livroId: '',
        usuarioId: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [livros, setLivros] = useState<Livro[]>([]);
    const [loadingData, setLoadingData] = useState(false);

    useEffect(() => {
        if (open) {
        carregarDados();
        }
    }, [open]);

    const carregarDados = async () => {
        setLoadingData(true);
        try {
            const [usuariosResponse, livrosResponse] = await Promise.all([
                usuarioService.getAll(1, 100),
                livroService.getAll(1, 100)
            ]);

            setUsuarios(usuariosResponse.usuarios);
            setLivros(livrosResponse.livros.filter((livro: Livro) => livro.disponivel));
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        } finally {
            setLoadingData(false);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.livroId) {
            newErrors.livroId = 'Livro é obrigatório';
        }

        if (!formData.usuarioId) {
            newErrors.usuarioId = 'Usuário é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave({
                livroId: parseInt(formData.livroId),
                usuarioId: parseInt(formData.usuarioId)
            });
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleClose = () => {
        setFormData({
            livroId: '',
            usuarioId: ''
        });
        setErrors({});
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="bg-blue-50 text-gray-800">
                    Novo Empréstimo
                </DialogTitle>

                <DialogContent className="pt-6">
                    <Box className="space-y-4">
                        <TextField
                            select
                            fullWidth
                            label="Usuário"
                            value={formData.usuarioId}
                            onChange={handleChange('usuarioId')}
                            error={!!errors.usuarioId}
                            helperText={errors.usuarioId}
                            disabled={loading || loadingData}
                        >
                            <MenuItem value="">Selecione um usuário</MenuItem>
                            {usuarios.map(usuario => (
                                <MenuItem key={usuario.id} value={usuario.id}>
                                    {usuario.nome} - {usuario.email}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            select
                            fullWidth
                            label="Livro Disponível"
                            value={formData.livroId}
                            onChange={handleChange('livroId')}
                            error={!!errors.livroId}
                            helperText={errors.livroId}
                            disabled={loading || loadingData}
                        >
                            <MenuItem value="">Selecione um livro</MenuItem>
                            {livros.map(livro => (
                                <MenuItem key={livro.id} value={livro.id}>
                                    {livro.titulo} - {livro.autor}
                                </MenuItem>
                            ))}
                        </TextField>

                        {livros.length === 0 && !loadingData && (
                            <Alert severity="info">
                                Nenhum livro disponível para empréstimo no momento.
                            </Alert>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions className="p-4 border-t">
                    <Button
                        onClick={handleClose}
                        disabled={loading}
                        className="text-gray-600"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || loadingData || livros.length === 0}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? 'Realizando...' : 'Realizar Empréstimo'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};