"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarLivrosPorTitulo = exports.buscarLivrosDisponiveis = exports.deletarLivro = exports.atualizarLivro = exports.buscarLivro = exports.listarLivros = exports.criarLivro = void 0;
const livroService_1 = require("../services/livroService");
const livroService = new livroService_1.LivroService();
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
        const livro = await livroService.criarLivro({
            titulo,
            autor,
            isbn,
            editora,
            ano: parseInt(ano)
        });
        res.status(201).json({
            message: 'Livro criado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao criar livro:', error);
        res.status(400).json({
            error: error.message
        });
    }
};
exports.criarLivro = criarLivro;
/**
 * Lista todos os livros
 */
const listarLivros = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 10;
        const resultado = await livroService.listarLivros(pagina, limite);
        res.json({
            message: 'Livros recuperados com sucesso',
            ...resultado
        });
    }
    catch (error) {
        console.error('Erro ao listar livros:', error);
        res.status(500).json({
            error: error.message
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
        const livro = await livroService.buscarLivroPorId(parseInt(id));
        res.json({
            message: 'Livro encontrado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao buscar livro:', error);
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: error.message
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
        const livro = await livroService.atualizarLivro(parseInt(id), {
            titulo,
            autor,
            isbn,
            editora,
            ano: ano ? parseInt(ano) : undefined,
            disponivel
        });
        res.json({
            message: 'Livro atualizado com sucesso',
            livro
        });
    }
    catch (error) {
        console.error('Erro ao atualizar livro:', error);
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(400).json({
            error: error.message
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
        const resultado = await livroService.deletarLivro(parseInt(id));
        res.json({
            message: resultado.message
        });
    }
    catch (error) {
        console.error('Erro ao deletar livro:', error);
        if (error.message === 'Livro não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(400).json({
            error: error.message
        });
    }
};
exports.deletarLivro = deletarLivro;
/**
 * Lista livros disponíveis
 */
const buscarLivrosDisponiveis = async (req, res) => {
    try {
        const livros = await livroService.listarLivrosDisponiveis();
        res.json({
            message: 'Livros disponíveis recuperados com sucesso',
            count: livros.length,
            livros
        });
    }
    catch (error) {
        console.error('Erro ao buscar livros disponíveis:', error);
        res.status(500).json({
            error: error.message
        });
    }
};
exports.buscarLivrosDisponiveis = buscarLivrosDisponiveis;
/**
 * Busca livros por título
 */
const buscarLivrosPorTitulo = async (req, res) => {
    try {
        const { titulo } = req.query;
        if (!titulo || typeof titulo !== 'string') {
            return res.status(400).json({
                error: 'Parâmetro "titulo" é obrigatório'
            });
        }
        const livros = await livroService.buscarLivrosPorTitulo(titulo);
        res.json({
            message: 'Livros encontrados com sucesso',
            count: livros.length,
            livros
        });
    }
    catch (error) {
        console.error('Erro ao buscar livros por título:', error);
        res.status(500).json({
            error: error.message
        });
    }
};
exports.buscarLivrosPorTitulo = buscarLivrosPorTitulo;
//# sourceMappingURL=livroController.js.map