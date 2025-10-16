"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarEmprestimosAtivos = exports.devolverLivro = exports.buscarEmprestimo = exports.listarEmprestimos = exports.criarEmprestimo = void 0;
const services_1 = require("../services");
const emprestimoService = new services_1.EmprestimoService();
/**
 * Cria um novo empréstimo
 */
const criarEmprestimo = async (req, res) => {
    try {
        const { livroId, usuarioId } = req.body;
        // Validação básica
        if (!livroId || !usuarioId) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios: livroId, usuarioId'
            });
        }
        const emprestimo = await emprestimoService.realizarEmprestimo(parseInt(usuarioId), parseInt(livroId));
        res.status(201).json({
            message: 'Empréstimo realizado com sucesso',
            emprestimo
        });
    }
    catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        res.status(400).json({
            error: error.message
        });
    }
};
exports.criarEmprestimo = criarEmprestimo;
/**
 * Lista todos os empréstimos
 */
const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimoService.listarEmprestimosAtivos();
        res.json({
            message: 'Empréstimos recuperados com sucesso',
            count: emprestimos.length,
            emprestimos
        });
    }
    catch (error) {
        console.error('Erro ao listar empréstimos:', error);
        res.status(500).json({
            error: error.message
        });
    }
};
exports.listarEmprestimos = listarEmprestimos;
/**
 * Busca um empréstimo por ID
 */
const buscarEmprestimo = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await emprestimoService.buscarEmprestimoPorId(parseInt(id));
        res.json({
            message: 'Empréstimo encontrado com sucesso',
            emprestimo
        });
    }
    catch (error) {
        console.error('Erro ao buscar empréstimo:', error);
        if (error.message === 'Empréstimo não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: error.message
        });
    }
};
exports.buscarEmprestimo = buscarEmprestimo;
/**
 * Devolve um livro
 */
const devolverLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await emprestimoService.devolverLivro(parseInt(id));
        res.json({
            message: 'Livro devolvido com sucesso',
            emprestimo
        });
    }
    catch (error) {
        console.error('Erro ao devolver livro:', error);
        if (error.message === 'Empréstimo não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(400).json({
            error: error.message
        });
    }
};
exports.devolverLivro = devolverLivro;
/**
 * Lista empréstimos ativos
 */
const listarEmprestimosAtivos = async (req, res) => {
    try {
        const emprestimos = await emprestimoService.listarEmprestimosAtivos();
        res.json({
            message: 'Empréstimos ativos recuperados com sucesso',
            count: emprestimos.length,
            emprestimos
        });
    }
    catch (error) {
        console.error('Erro ao listar empréstimos ativos:', error);
        res.status(500).json({
            error: error.message
        });
    }
};
exports.listarEmprestimosAtivos = listarEmprestimosAtivos;
//# sourceMappingURL=emprestimoController.js.map