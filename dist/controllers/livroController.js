"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarLivrosDisponiveis = exports.deletarLivro = exports.atualizarLivro = exports.buscarLivro = exports.listarLivros = exports.criarLivro = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Cria um novo livro
 */
const criarLivro = async (req, res) => {
    try {
        const { titulo, autor, isbn, editora, ano } = req.body;
        // Validação básica
        if (!titulo || !autor || !isbn || !editora || !ano) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios: titulo, autor, isbn, editora, ano'
            });
        }
        // Verifica se ISBN já existe
        const livroExistente = await client_1.default.livro.findUnique({
            where: { isbn }
        });
        if (livroExistente) {
            return res.status(400).json({
                error: 'Já existe um livro com este ISBN'
            });
        }
        const livro = await client_1.default.livro.create({
            data: {
                titulo,
                autor,
                isbn,
                editora,
                ano: parseInt(ano)
            }
        });
        res.status(201).json({
            message: 'Livro criado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao criar livro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao criar livro'
        });
    }
};
exports.criarLivro = criarLivro;
/**
 * Lista todos os livros
 */
const listarLivros = async (req, res) => {
    try {
        const livros = await client_1.default.livro.findMany({
            orderBy: {
                titulo: 'asc'
            }
        });
        res.json({
            message: 'Livros recuperados com sucesso',
            count: livros.length,
            livros
        });
    }
    catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao listar livros'
        });
    }
};
exports.listarLivros = listarLivros;
/**
 * Busca um livro por ID
 */
const buscarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const livro = await client_1.default.livro.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!livro) {
            return res.status(404).json({
                error: 'Livro não encontrado'
            });
        }
        res.json({
            message: 'Livro encontrado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao buscar livro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao buscar livro'
        });
    }
};
exports.buscarLivro = buscarLivro;
/**
 * Atualiza um livro
 */
const atualizarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, isbn, editora, ano, disponivel } = req.body;
        // Verifica se o livro existe
        const livroExistente = await client_1.default.livro.findUnique({
            where: { id: parseInt(id) }
        });
        if (!livroExistente) {
            return res.status(404).json({
                error: 'Livro não encontrado'
            });
        }
        // Se estiver tentando mudar o ISBN, verifica se não existe outro com mesmo ISBN
        if (isbn && isbn !== livroExistente.isbn) {
            const isbnExistente = await client_1.default.livro.findUnique({
                where: { isbn }
            });
            if (isbnExistente) {
                return res.status(400).json({
                    error: 'Já existe outro livro com este ISBN'
                });
            }
        }
        const livro = await client_1.default.livro.update({
            where: { id: parseInt(id) },
            data: {
                titulo,
                autor,
                isbn,
                editora,
                ano: ano ? parseInt(ano) : undefined,
                disponivel
            }
        });
        res.json({
            message: 'Livro atualizado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao atualizar livro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao atualizar livro'
        });
    }
};
exports.atualizarLivro = atualizarLivro;
/**
 * Deleta um livro
 */
const deletarLivro = async (req, res) => {
    try {
        const { id } = req.params;
        // Verifica se o livro existe
        const livroExistente = await client_1.default.livro.findUnique({
            where: { id: parseInt(id) }
        });
        if (!livroExistente) {
            return res.status(404).json({
                error: 'Livro não encontrado'
            });
        }
        // Verifica se o livro está em algum empréstimo ativo
        const emprestimoAtivo = await client_1.default.emprestimo.findFirst({
            where: {
                livroId: parseInt(id),
                devolvido: false
            }
        });
        if (emprestimoAtivo) {
            return res.status(400).json({
                error: 'Não é possível deletar um livro que está emprestado'
            });
        }
        await client_1.default.livro.delete({
            where: { id: parseInt(id) }
        });
        res.json({
            message: 'Livro deletado com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao deletar livro:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao deletar livro'
        });
    }
};
exports.deletarLivro = deletarLivro;
/**
 * Lista livros disponíveis
 */
const buscarLivrosDisponiveis = async (req, res) => {
    try {
        const livros = await client_1.default.livro.findMany({
            where: {
                disponivel: true
            },
            orderBy: {
                titulo: 'asc'
            }
        });
        res.json({
            message: 'Livros disponíveis recuperados com sucesso',
            count: livros.length,
            livros
        });
    }
    catch (error) {
        console.error('Erro ao buscar livros disponíveis:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao buscar livros disponíveis'
        });
    }
};
exports.buscarLivrosDisponiveis = buscarLivrosDisponiveis;
//# sourceMappingURL=livroController.js.map