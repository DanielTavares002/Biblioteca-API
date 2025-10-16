"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletarUsuario = exports.atualizarUsuario = exports.buscarUsuario = exports.listarUsuarios = exports.criarUsuario = void 0;
const usuarioService_1 = require("../services/usuarioService");
const usuarioService = new usuarioService_1.UsuarioService();
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               email:
 *                 type: string
 *                 example: "joao@email.com"
 *               telefone:
 *                 type: string
 *                 example: "11999999999"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
const criarUsuario = async (req, res) => {
    try {
        const { nome, email, telefone } = req.body;
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
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     parameters:
 *       - in: query
 *         name: pagina
 *         schema:
 *           type: integer
 *         description: Número da página
 *       - in: query
 *         name: limite
 *         schema:
 *           type: integer
 *         description: Quantidade de itens por página
 *     responses:
 *       200:
 *         description: Lista de usuários
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
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Busca um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
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
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado
 *       404:
 *         description: Usuário não encontrado
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
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
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