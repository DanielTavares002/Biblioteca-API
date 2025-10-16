"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
class UsuarioService {
    async criarUsuario(dados) {
        try {
            // Verificar se email já existe
            const usuarioExistente = await prisma_1.default.usuario.findUnique({
                where: { email: dados.email }
            });
            if (usuarioExistente) {
                throw new Error('Já existe um usuário com este email');
            }
            const usuario = await prisma_1.default.usuario.create({
                data: {
                    nome: dados.nome,
                    email: dados.email,
                    telefone: dados.telefone
                }
            });
            return usuario;
        }
        catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }
    async listarUsuarios(pagina = 1, limite = 10) {
        try {
            const skip = (pagina - 1) * limite;
            const [usuarios, total] = await Promise.all([
                prisma_1.default.usuario.findMany({
                    skip,
                    take: limite,
                    orderBy: { nome: 'asc' },
                    include: {
                        _count: {
                            select: {
                                emprestimos: {
                                    where: {
                                        devolvido: false
                                    }
                                }
                            }
                        }
                    }
                }),
                prisma_1.default.usuario.count()
            ]);
            return {
                usuarios: usuarios.map(usuario => ({
                    ...usuario,
                    emprestimosAtivos: usuario._count.emprestimos
                })),
                paginacao: {
                    pagina,
                    limite,
                    total,
                    totalPaginas: Math.ceil(total / limite)
                }
            };
        }
        catch (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`);
        }
    }
    async buscarUsuarioPorId(id) {
        try {
            const usuario = await prisma_1.default.usuario.findUnique({
                where: { id },
                include: {
                    emprestimos: {
                        include: {
                            livro: true
                        },
                        orderBy: {
                            dataEmprestimo: 'desc'
                        }
                    }
                }
            });
            if (!usuario) {
                throw new Error('Usuário não encontrado');
            }
            return usuario;
        }
        catch (error) {
            throw new Error(`Erro ao buscar usuário: ${error.message}`);
        }
    }
    async atualizarUsuario(id, dados) {
        try {
            // Verificar se usuário existe
            const usuarioExistente = await prisma_1.default.usuario.findUnique({
                where: { id }
            });
            if (!usuarioExistente) {
                throw new Error('Usuário não encontrado');
            }
            // Se estiver atualizando email, verificar conflito
            if (dados.email && dados.email !== usuarioExistente.email) {
                const emailExistente = await prisma_1.default.usuario.findUnique({
                    where: { email: dados.email }
                });
                if (emailExistente) {
                    throw new Error('Já existe um usuário com este email');
                }
            }
            const usuario = await prisma_1.default.usuario.update({
                where: { id },
                data: dados
            });
            return usuario;
        }
        catch (error) {
            throw new Error(`Erro ao atualizar usuário: ${error.message}`);
        }
    }
    async deletarUsuario(id) {
        try {
            // Verificar se usuário existe
            const usuarioExistente = await prisma_1.default.usuario.findUnique({
                where: { id },
                include: {
                    _count: {
                        select: {
                            emprestimos: {
                                where: {
                                    devolvido: false
                                }
                            }
                        }
                    }
                }
            });
            if (!usuarioExistente) {
                throw new Error('Usuário não encontrado');
            }
            // Verificar se há empréstimos ativos
            if (usuarioExistente._count.emprestimos > 0) {
                throw new Error('Não é possível deletar usuário com empréstimos ativos');
            }
            await prisma_1.default.usuario.delete({
                where: { id }
            });
            return { message: 'Usuário deletado com sucesso' };
        }
        catch (error) {
            throw new Error(`Erro ao deletar usuário: ${error.message}`);
        }
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuarioService.js.map