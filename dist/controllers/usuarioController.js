"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUsuario = exports.atualizarUsuario = exports.buscarUsuario = exports.listarUsuarios = exports.criarUsuario = void 0;
const client_1 = __importDefault(require("../prisma/client"));
/**
 * Cria um novo usuário
 */
const criarUsuario = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
        // Validação básica
        if (!nome || !email || !telefone) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios: nome, email, telefone'
            });
        }
        // Verifica se email já existe
        const usuarioExistente = await client_1.default.usuario.findUnique({
            where: { email }
        });
        if (usuarioExistente) {
            return res.status(400).json({
                error: 'Já existe um usuário com este email'
            });
        }
        const usuario = await client_1.default.usuario.create({
            data: {
                nome,
                email,
                telefone
            }
        });
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao criar usuário'
        });
    }
};
exports.criarUsuario = criarUsuario;
/**
 * Lista todos os usuários
 */
const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await client_1.default.usuario.findMany({
            orderBy: {
                nome: 'asc'
            },
            include: {
                emprestimos: {
                    where: {
                        devolvido: false
                    },
                    include: {
                        livro: true
                    }
                }
            }
        });
        res.json({
            message: 'Usuários recuperados com sucesso',
            count: usuarios.length,
            usuarios
        });
    }
    catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao listar usuários'
        });
    }
};
exports.listarUsuarios = listarUsuarios;
/**
 * Busca um usuário por ID
 */
const buscarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await client_1.default.usuario.findUnique({
            where: {
                id: parseInt(id)
            },
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
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }
        res.json({
            message: 'Usuário encontrado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao buscar usuário'
        });
    }
};
exports.buscarUsuario = buscarUsuario;
/**
 * Atualiza um usuário
 */
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, telefone } = req.body;
        // Verifica se o usuário existe
        const usuarioExistente = await client_1.default.usuario.findUnique({
            where: { id: parseInt(id) }
        });
        if (!usuarioExistente) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }
        // Se estiver tentando mudar o email, verifica se não existe outro com mesmo email
        if (email && email !== usuarioExistente.email) {
            const emailExistente = await client_1.default.usuario.findUnique({
                where: { email }
            });
            if (emailExistente) {
                return res.status(400).json({
                    error: 'Já existe outro usuário com este email'
                });
            }
        }
        const usuario = await client_1.default.usuario.update({
            where: { id: parseInt(id) },
            data: {
                nome,
                email,
                telefone
            }
        });
        res.json({
            message: 'Usuário atualizado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao atualizar usuário'
        });
    }
};
exports.atualizarUsuario = atualizarUsuario;
/**
 * Deleta um usuário
 */
const deletarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        // Verifica se o usuário existe
        const usuarioExistente = await client_1.default.usuario.findUnique({
            where: { id: parseInt(id) },
            include: {
                emprestimos: {
                    where: {
                        devolvido: false
                    }
                }
            }
        });
        if (!usuarioExistente) {
            return res.status(404).json({
                error: 'Usuário não encontrado'
            });
        }
        // Verifica se o usuário tem empréstimos ativos
        if (usuarioExistente.emprestimos.length > 0) {
            return res.status(400).json({
                error: 'Não é possível deletar um usuário com empréstimos ativos'
            });
        }
        await client_1.default.usuario.delete({
            where: { id: parseInt(id) }
        });
        res.json({
            message: 'Usuário deletado com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({
            error: 'Erro interno do servidor ao deletar usuário'
        });
    }
};
exports.deletarUsuario = deletarUsuario;
//# sourceMappingURL=usuarioController.js.map