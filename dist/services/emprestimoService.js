"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class EmprestimoService {
    async realizarEmprestimo(usuarioId, livroId) {
        try {
            // Verificar se usuário existe
            const usuario = await prisma_1.default.usuario.findUnique({
                where: { id: usuarioId }
            });
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            // Verificar se livro existe e está disponível
            const livro = await prisma_1.default.livro.findUnique({
                where: { id: livroId }
            });
            if (!livro) {
                throw new Error('Livro não encontrado');
            }
            if (!livro.disponivel) {
                throw new Error('Livro não disponível para empréstimo');
            }
            // Verificar se usuário já tem este livro emprestado
            const emprestimoAtivo = await prisma_1.default.emprestimo.findFirst({
                where: {
                    usuarioId,
                    livroId,
                    devolvido: false
                }
            });
            if (emprestimoAtivo) {
                throw new Error('Usuário já possui este livro emprestado');
            }
            // Realizar o empréstimo em uma transação
            const resultado = await prisma_1.default.$transaction(async (tx) => {
                // Criar o empréstimo
                const emprestimo = await tx.emprestimo.create({
                    data: {
                        usuarioId,
                        livroId
                    }
                });
                // Marcar livro como indisponível
                await tx.livro.update({
                    where: { id: livroId },
                    data: {
                        disponivel: false
                    }
                });
                return emprestimo;
            });
            return resultado;
        }
        catch (error) {
            throw new Error(`Erro ao realizar empréstimo: ${error.message}`);
        }
    }
    async devolverLivro(emprestimoId) {
        try {
            // Buscar empréstimo
            const emprestimo = await prisma_1.default.emprestimo.findUnique({
                where: { id: emprestimoId },
                include: {
                    livro: true
                }
            });
            if (!emprestimo) {
                throw new Error('Empréstimo não encontrado');
            }
            if (emprestimo.devolvido) {
                throw new Error('Livro já foi devolvido');
            }
            // Realizar devolução em transação
            const resultado = await prisma_1.default.$transaction(async (tx) => {
                // Atualizar empréstimo
                const emprestimoAtualizado = await tx.emprestimo.update({
                    where: { id: emprestimoId },
                    data: {
                        dataDevolucao: new Date(),
                        devolvido: true
                    }
                });
                // Marcar livro como disponível
                await tx.livro.update({
                    where: { id: emprestimo.livroId },
                    data: {
                        disponivel: true
                    }
                });
                return emprestimoAtualizado;
            });
            return resultado;
        }
        catch (error) {
            throw new Error(`Erro ao devolver livro: ${error.message}`);
        }
    }
    async listarEmprestimosAtivos() {
        try {
            const emprestimos = await prisma_1.default.emprestimo.findMany({
                where: {
                    devolvido: false
                },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    livro: {
                        select: {
                            id: true,
                            titulo: true,
                            autor: true,
                            isbn: true
                        }
                    }
                },
                orderBy: {
                    dataEmprestimo: 'desc'
                }
            });
            return emprestimos;
        }
        catch (error) {
            throw new Error(`Erro ao listar empréstimos ativos: ${error.message}`);
        }
    }
    async listarTodosEmprestimos() {
        try {
            const emprestimos = await prisma_1.default.emprestimo.findMany({
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    livro: {
                        select: {
                            id: true,
                            titulo: true,
                            autor: true,
                            isbn: true
                        }
                    }
                },
                orderBy: {
                    dataEmprestimo: 'desc'
                }
            });
            return emprestimos;
        }
        catch (error) {
            throw new Error(`Erro ao listar todos os empréstimos: ${error.message}`);
        }
    }
    async historicoUsuario(usuarioId) {
        try {
            const emprestimos = await prisma_1.default.emprestimo.findMany({
                where: {
                    usuarioId
                },
                include: {
                    livro: {
                        select: {
                            titulo: true,
                            autor: true,
                            isbn: true
                        }
                    }
                },
                orderBy: {
                    dataEmprestimo: 'desc'
                }
            });
            return emprestimos;
        }
        catch (error) {
            throw new Error(`Erro ao buscar histórico: ${error.message}`);
        }
    }
    async buscarEmprestimoPorId(id) {
        try {
            const emprestimo = await prisma_1.default.emprestimo.findUnique({
                where: { id },
                include: {
                    usuario: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    },
                    livro: {
                        select: {
                            id: true,
                            titulo: true,
                            autor: true,
                            isbn: true
                        }
                    }
                }
            });
            if (!emprestimo) {
                throw new Error('Empréstimo não encontrado');
            }
            return emprestimo;
        }
        catch (error) {
            throw new Error(`Erro ao buscar empréstimo: ${error.message}`);
        }
    }
    async deletarEmprestimo(id) {
        try {
            const emprestimo = await prisma_1.default.emprestimo.findUnique({
                where: { id }
            });
            if (!emprestimo) {
                throw new Error('Empréstimo não encontrado');
            }
            await prisma_1.default.emprestimo.delete({
                where: { id }
            });
            return { message: 'Empréstimo deletado com sucesso' };
        }
        catch (error) {
            throw new Error(`Erro ao deletar empréstimo: ${error.message}`);
        }
    }
}
exports.EmprestimoService = EmprestimoService;
//# sourceMappingURL=emprestimoService.js.map