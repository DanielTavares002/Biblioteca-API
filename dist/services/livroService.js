"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class LivroService {
    async criarLivro(dados) {
        try {
            // Verificar se ISBN já existe
            const livroExistente = await prisma_1.default.livro.findUnique({
                where: { isbn: dados.isbn }
            });
            if (livroExistente) {
                throw new Error('Já existe um livro com este ISBN');
            }
            // Criar o livro
            const livro = await prisma_1.default.livro.create({
                data: {
                    titulo: dados.titulo,
                    autor: dados.autor,
                    isbn: dados.isbn,
                    editora: dados.editora,
                    ano: dados.ano,
                    disponivel: true
                }
            });
            return livro;
        }
        catch (error) {
            throw new Error(`Erro ao criar livro: ${error.message}`);
        }
    }
    async listarLivros(pagina = 1, limite = 10) {
        try {
            const skip = (pagina - 1) * limite;
            const [livros, total] = await Promise.all([
                prisma_1.default.livro.findMany({
                    skip,
                    take: limite,
                    orderBy: { titulo: 'asc' }
                }),
                prisma_1.default.livro.count()
            ]);
            return {
                livros,
                paginacao: {
                    pagina,
                    limite,
                    total,
                    totalPaginas: Math.ceil(total / limite)
                }
            };
        }
        catch (error) {
            throw new Error(`Erro ao listar livros: ${error.message}`);
        }
    }
    async buscarLivroPorId(id) {
        try {
            const livro = await prisma_1.default.livro.findUnique({
                where: { id }
            });
            if (!livro) {
                throw new Error('Livro não encontrado');
            }
            return livro;
        }
        catch (error) {
            throw new Error(`Erro ao buscar livro: ${error.message}`);
        }
    }
    async buscarLivrosPorTitulo(titulo) {
        try {
            const livros = await prisma_1.default.livro.findMany({
                where: {
                    titulo: {
                        contains: titulo
                    }
                }
            });
            return livros;
        }
        catch (error) {
            throw new Error(`Erro ao buscar livros por título: ${error.message}`);
        }
    }
    async atualizarLivro(id, dados) {
        try {
            // Verificar se livro existe
            const livroExistente = await prisma_1.default.livro.findUnique({
                where: { id }
            });
            if (!livroExistente) {
                throw new Error('Livro não encontrado');
            }
            // Se estiver atualizando ISBN, verificar se não conflita
            if (dados.isbn && dados.isbn !== livroExistente.isbn) {
                const isbnExistente = await prisma_1.default.livro.findUnique({
                    where: { isbn: dados.isbn }
                });
                if (isbnExistente) {
                    throw new Error('Já existe um livro com este ISBN');
                }
            }
            const livro = await prisma_1.default.livro.update({
                where: { id },
                data: dados
            });
            return livro;
        }
        catch (error) {
            throw new Error(`Erro ao atualizar livro: ${error.message}`);
        }
    }
    async deletarLivro(id) {
        try {
            // Verificar se livro existe
            const livroExistente = await prisma_1.default.livro.findUnique({
                where: { id },
                include: {
                    emprestimos: {
                        where: {
                            devolvido: false
                        }
                    }
                }
            });
            if (!livroExistente) {
                throw new Error('Livro não encontrado');
            }
            if (livroExistente.emprestimos.length > 0) {
                throw new Error('Não é possível deletar um livro com empréstimos ativos');
            }
            await prisma_1.default.livro.delete({
                where: { id }
            });
            return { message: 'Livro deletado com sucesso' };
        }
        catch (error) {
            throw new Error(`Erro ao deletar livro: ${error.message}`);
        }
    }
    async listarLivrosDisponiveis() {
        try {
            const livros = await prisma_1.default.livro.findMany({
                where: {
                    disponivel: true
                }
            });
            return livros;
        }
        catch (error) {
            throw new Error(`Erro ao listar livros disponíveis: ${error.message}`);
        }
    }
}
exports.LivroService = LivroService;
//# sourceMappingURL=livroService.js.map