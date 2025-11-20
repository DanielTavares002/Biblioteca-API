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
  IconButton,
  Chip,
  Typography,
  Alert,
  Snackbar,
  Tabs,
  Tab
} from '@mui/material';
import { Add, CheckCircle, Visibility } from '@mui/icons-material';
import { EmprestimoForm } from '../components/emprestimos/EmprestimoForm';
import { emprestimoService } from '../services/emprestimoService';
import type { Emprestimo } from '../services/types';

export const EmprestimosPage: React.FC = () => {
    const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
    const [loading, setLoading] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error'
    });
    const [tabValue, setTabValue] = useState(0);
    const carregarEmprestimos = async (ativos?: boolean) => {
        setLoading(true);
        try {
            const response = await emprestimoService.getAll(ativos);
            setEmprestimos(response.emprestimos);
        } catch (error) {
            console.error('Erro ao carregar empréstimos:', error);
            mostrarSnackbar('Erro ao carregar empréstimos', 'error');
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

    const handleCriarEmprestimo = async (emprestimoData: { livroId: number; usuarioId: number }) => {
        try {
            await emprestimoService.create(emprestimoData);
            setFormOpen(false);
            carregarEmprestimos(tabValue === 0);
            mostrarSnackbar('Empréstimo realizado com sucesso!');
        } catch (error: any) {
            mostrarSnackbar(error.response?.data?.error || 'Erro ao realizar empréstimo', 'error');
        }
    };

    const handleDevolverLivro = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja registrar a devolução deste livro?')) {
            return;
        }

        try {
            await emprestimoService.devolver(id);
            carregarEmprestimos(tabValue === 0);
            mostrarSnackbar('Livro devolvido com sucesso!');
        } catch (error: any) {
            mostrarSnackbar(error.response?.data?.error || 'Erro ao devolver livro', 'error');
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const formatarData = (data: string) => {
        return new Date(data).toLocaleDateString('pt-BR');
    };

    return (
        <Box className="p-6">
            <Box className="flex justify-between items-center mb-6">
                <Typography variant="h4" className="text-gray-800 font-bold">
                    Gerenciar Empréstimos
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => setFormOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Novo Empréstimo
                </Button>
            </Box>

            <Paper className="shadow-lg rounded-lg mb-4">
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    className="border-b"
                >
                    <Tab label="Empréstimos Ativos" />
                    <Tab label="Todos os Empréstimos" />
                </Tabs>
            </Paper>

            <Paper className="shadow-lg rounded-lg">
                <TableContainer>
                    <Table>
                        <TableHead className="bg-gray-50">
                            <TableRow>
                                <TableCell className="font-semibold">Usuário</TableCell>
                                <TableCell className="font-semibold">Livro</TableCell>
                                <TableCell className="font-semibold">Data Empréstimo</TableCell>
                                <TableCell className="font-semibold">Data Devolução</TableCell>
                                <TableCell className="font-semibold">Status</TableCell>
                                <TableCell className="font-semibold text-center">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {emprestimos.map((emprestimo) => (
                                <TableRow
                                    key={emprestimo.id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <TableCell className="font-medium">
                                        {emprestimo.usuario?.nome}
                                    </TableCell>
                                    <TableCell>
                                        {emprestimo.livro?.titulo}
                                    </TableCell>
                                    <TableCell>
                                        {formatarData(emprestimo.dataEmprestimo)}
                                    </TableCell>
                                    <TableCell>
                                        {emprestimo.dataDevolucao
                                            ? formatarData(emprestimo.dataDevolucao)
                                            :'-'
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={emprestimo.devolvido ? 'Devolvido' : 'Ativo'}
                                            color={emprestimo.devolvido ? 'success' : 'primary'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {!emprestimo.devolvido && (
                                            <IconButton
                                                onClick={() => handleDevolverLivro(emprestimo.id!)}
                                                className="text-green-600 hover:bg-green-50"
                                                size="small"
                                                title="Registrar Devolução"
                                            >
                                                <CheckCircle />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {emprestimos.length === 0 && !loading && (
                    <Box className="text-center py-12">
                        <Typography variant="h6" color="textSecondary">
                            {tabValue === 0
                                ? 'Nenhum empréstimo ativo no momento'
                                : 'Nenhum empréstimo encontrado'    
                            }
                        </Typography>
                    </Box>
                )}
            </Paper>

            <EmprestimoForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSave={handleCriarEmprestimo}
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
};