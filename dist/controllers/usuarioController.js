"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUsuario = exports.atualizarUsuario = exports.buscarUsuario = exports.listarUsuarios = exports.criarUsuario = void 0;
const services_1 = require("../services");
const usuarioService = new services_1.UsuarioService();
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
        const usuario = await usuarioService.criarUsuario({
            nome,
            email,
            telefone
        });
        res.status(201).json({
            message: 'Usuário criado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(400).json({
            error: error.message
        });
    }
};
exports.criarUsuario = criarUsuario;
/**
 * Lista todos os usuários
 */
const listarUsuarios = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const limite = parseInt(req.query.limite) || 10;
        const resultado = await usuarioService.listarUsuarios(pagina, limite);
        res.json({
            message: 'Usuários recuperados com sucesso',
            ...resultado
        });
    }
    catch (error) {
        console.error('Erro ao listar usuários:', error);
        res.status(500).json({
            error: error.message
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
        const usuario = await usuarioService.buscarUsuarioPorId(parseInt(id));
        res.json({
            message: 'Usuário encontrado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(500).json({
            error: error.message
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
        const usuario = await usuarioService.atualizarUsuario(parseInt(id), {
            nome,
            email,
            telefone
        });
        res.json({
            message: 'Usuário atualizado com sucesso',
            usuario
        });
    }
    catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(400).json({
            error: error.message
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
        const resultado = await usuarioService.deletarUsuario(parseInt(id));
        res.json({
            message: resultado.message
        });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json({
                error: error.message
            });
        }
        res.status(400).json({
            error: error.message
        });
    }
};
exports.deletarUsuario = deletarUsuario;
//# sourceMappingURL=usuarioController.js.map