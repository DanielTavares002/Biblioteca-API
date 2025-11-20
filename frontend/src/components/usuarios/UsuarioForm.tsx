import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import type { Usuario } from '../../services/types';

interface UsuarioFormProps {
    open: boolean;
    onClose: () => void;
    onSave: (usuario: Omit<Usuario, 'id'>) => void;
    usuario?: Usuario | null;
    loading?: boolean;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({
    open,
    onClose,
    onSave,
    usuario,
    loading = false
}) => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string}>({});

    useEffect(() => {
        if (usuario) {
            setFormData({
                nome: usuario.nome,
                email: usuario.email,
                telefone: usuario.telefone
            });
        } else {
            setFormData({
                nome: '',
                email: '',
                telefone: ''
            });
        }
        setErrors({});
    }, [usuario, open]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.nome.trim()) {
            newErrors.nome = 'Nome é obrigatório';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!formData.telefone.trim()) {
            newErrors.telefone = 'Telefone é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSave(formData);
        }
    };

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [field]: e.target.value
        }));
        // Limpa erro quando o usuário começa a digitar
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle className="bg-blue-50 text-gray-800">
                    {usuario ? 'Editar Usuário' : 'Novo Usuário'}
                </DialogTitle>

                <DialogContent className="pt-6">
                    <Box className="space-y-4">
                        <TextField
                            fullWidth
                            label="Nome"
                            value={formData.nome}
                            onChange={handleChange('nome')}
                            error={!!errors.nome}
                            helperText={errors.nome}
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange('email')}
                            error={!!errors.email}
                            helperText={errors.email}
                            disabled={loading}
                        />

                        <TextField
                            fullWidth
                            label="Telefone"
                            value={formData.telefone}
                            onChange={handleChange('telefone')}
                            error={!!errors.telefone}
                            helperText={errors.telefone}
                            disabled={loading}
                        />
                    </Box>
                </DialogContent>

                <DialogActions className="p-4 border-t">
                    <Button 
                        onClick={onClose}
                        disabled={loading}
                        className="text-gray-600"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {loading ? 'Salvando...' : (usuario ? 'Atualizar' : 'Criar')}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};