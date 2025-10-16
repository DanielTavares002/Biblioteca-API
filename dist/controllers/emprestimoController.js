"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devolverLivro = exports.buscarEmprestimo = exports.listarEmprestimosAtivos = exports.listarEmprestimos = exports.criarEmprestimo = void 0;
const client_1 = __importDefault(require("../prisma/client"));
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
        // Verifica se o livro existe e está disponível
        const livro = await client_1.default.livro.findUnique({
            where: { id: parseInt(livroId) }
        });
        if (!livro) {
            return res.status(404).json({
                error: 'Livro não encontrado'
            });
        }
        if (!livro.disponivel) {
            return res.status(400).json({
                error: 'Livro não está disponível para empréstimo'
            });
        }
        // Verifica se o usuário existe
        const usuario = await client_1.default.usuario.findUnique({
            where: { id: parseInt(usuarioId) }
        });
        if (!usuario) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }
        // Cria o empréstimo
        const emprestimo = await client_1.default.emprestimo.create({
            data: {
                livroId: parseInt(livroId),
                usuarioId: parseInt(usuarioId)
            },
            include: {
                livro: true,
                usuario: true
            }
        });
        // Atualiza o livro para indisponível
        await client_1.default.livro.update({
            where: { id: parseInt(livroId) },
            data: { disponivel: false }
        });
        res.status(201).json({
            message: 'Empréstimo realizado com sucesso',
            emprestimo
        });
    }
    catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao criar empréstimo'
        });
    }
};
exports.criarEmprestimo = criarEmprestimo;
/**
 * Lista todos os empréstimos
 */
const listarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await client_1.default.emprestimo.findMany({
            include: {
                livro: true,
                usuario: true
            },
            orderBy: {
                dataEmprestimo: 'desc'
            }
        });
        res.json({
            message: 'Empréstimos recuperados com sucesso',
            count: emprestimos.length,
            emprestimos
        });
    }
    catch (error) {
        console.error('Erro ao listar empréstimos:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao listar empréstimos'
        });
    }
};
exports.listarEmprestimos = listarEmprestimos;
/**
 * Lista empréstimos ativos
 */
const listarEmprestimosAtivos = async (req, res) => {
    try {
        const emprestimos = await client_1.default.emprestimo.findMany({
            where: {
                devolvido: false
            },
            include: {
                livro: true,
                usuario: true
            },
            orderBy: {
                dataEmprestimo: 'desc'
            }
        });
        res.json({
            message: 'Empréstimos ativos recuperados com sucesso',
            count: emprestimos.length,
            emprestimos
        });
    }
    catch (error) {
        console.error('Erro ao listar empréstimos ativos:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao listar empréstimos ativos'
        });
    }
};
exports.listarEmprestimosAtivos = listarEmprestimosAtivos;
/**
 * Busca um empréstimo por ID
 */
const buscarEmprestimo = async (req, res) => {
    try {
        const { id } = req.params;
        const emprestimo = await client_1.default.emprestimo.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                livro: true,
                usuario: true
            }
        });
        if (!emprestimo) {
            return res.status(404).json({
                error: 'Empréstimo não encontrado'
            });
        }
        res.json({
            message: 'Empréstimo encontrado com sucesso',
            emprestimo
        });
    }
    catch (error) {
        console.error('Erro ao buscar empréstimo:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao buscar empréstimo'
        });
    }
};
exports.buscarEmprestimo = buscarEmprestimo;
/**
 * Devolve um livro (marca empréstimo como devolvido)
 */
const devolverLivro = async (req, res) => {
    try {
        const { id } = req.params;
        // Verifica se o empréstimo existe
        const emprestimo = await client_1.default.emprestimo.findUnique({
            where: { id: parseInt(id) },
            include: {
                livro: true
            }
        });
        if (!emprestimo) {
            return res.status(404).json({
                error: 'Empréstimo não encontrado'
            });
        }
        if (emprestimo.devolvido) {
            return res.status(400).json({
                error: 'Este livro já foi devolvido'
            });
        }
        // Atualiza o empréstimo
        const emprestimoAtualizado = await client_1.default.emprestimo.update({
            where: { id: parseInt(id) },
            data: {
                devolvido: true,
                dataDevolucao: new Date()
            },
            include: {
                livro: true,
                usuario: true
            }
        });
        // Atualiza o livro para disponível
        await client_1.default.livro.update({
            where: { id: emprestimo.livroId },
            data: { disponivel: true }
        });
        res.json({
            message: 'Livro devolvido com sucesso',
            emprestimo: emprestimoAtualizado
        });
    }
    catch (error) {
        console.error('Erro ao devolver livro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao devolver livro'
        });
    }
};
exports.devolverLivro = devolverLivro;
//# sourceMappingURL=emprestimoController.js.map