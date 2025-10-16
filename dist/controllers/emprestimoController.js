"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarEmprestimosAtivos = exports.historicoUsuario = exports.devolverLivro = exports.buscarEmprestimo = exports.listarEmprestimos = exports.criarEmprestimo = void 0;
const services_1 = require("../services");
const emprestimoService = new services_1.EmprestimoService();
/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - livroId
 *               - usuarioId
 *             properties:
 *               livroId:
 *                 type: integer
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
const criarEmprestimo = async (req, res) => {
    try {
        const { livroId, usuarioId } = req.body;
        if (!livroId || !usuarioId) {
            return res.status(400).json({
                error: 'livroId e usuarioId são obrigatórios'
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
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: query
 *         name: ativos
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas empréstimos ativos
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
const listarEmprestimos = async (req, res) => {
    try {
        const { ativos } = req.query;
        let emprestimos;
        if (ativos === 'true') {
            emprestimos = await emprestimoService.listarEmprestimosAtivos();
        }
        else {
            // Para listar todos, precisamos criar este método no service
            emprestimos = await emprestimoService.listarTodosEmprestimos();
        }
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
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo por ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *       404:
 *         description: Empréstimo não encontrado
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
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra a devolução de um livro
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *       404:
 *         description: Empréstimo não encontrado
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
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Lista histórico de empréstimos de um usuário
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico do usuário
 */
const historicoUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const emprestimos = await emprestimoService.historicoUsuario(parseInt(usuarioId));
        res.json({
            message: 'Histórico de empréstimos recuperado com sucesso',
            count: emprestimos.length,
            emprestimos
        });
    }
    catch (error) {
        console.error('Erro ao buscar histórico:', error);
        res.status(500).json({
            error: error.message
        });
    }
};
exports.historicoUsuario = historicoUsuario;
/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista apenas empréstimos ativos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos ativos
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