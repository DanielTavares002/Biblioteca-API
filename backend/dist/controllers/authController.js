"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const JWT_SECRET = process.env.JWT_SECRET || 'biblioteca_secret_key';
class AuthController {
    /**
     * @swagger
     * /auth/registrar:
     *   post:
     *     summary: Registrar novo secretário
     *     tags: [Autenticação]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nome
     *               - email
     *               - senha
     *             properties:
     *               nome:
     *                 type: string
     *                 example: "Admin"
     *               email:
     *                 type: string
     *                 example: "admin@biblioteca.com"
     *               senha:
     *                 type: string
     *                 example: "123456"
     *     responses:
     *       201:
     *         description: Secretário criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 secretario:
     *                   $ref: '#/components/schemas/Secretario'
     *       400:
     *         description: Dados inválidos
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Error'
     *       500:
     *         description: Erro interno do servidor
     */
    // Registrar novo secretário
    async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    error: 'Todos os campos são obrigatórios: nome, email, senha'
                });
            }
            // Verificar se email já existe
            const secretarioExistente = await prisma_1.default.secretario.findUnique({
                where: { email }
            });
            if (secretarioExistente) {
                return res.status(400).json({
                    error: 'Já existe um secretário com este email'
                });
            }
            // Hash da senha
            const senhaHash = await bcryptjs_1.default.hash(senha, 12);
            // Criar secretário
            const secretario = await prisma_1.default.secretario.create({
                data: {
                    nome,
                    email,
                    senha: senhaHash
                },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    createdAt: true
                }
            });
            res.status(201).json({
                message: 'Secretário criado com sucesso',
                secretario
            });
        }
        catch (error) {
            console.error('Erro ao registrar secretário:', error);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }
    /**
     * @swagger
     * /auth/login:
     *   post:
     *     summary: Login de secretário
     *     tags: [Autenticação]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - senha
     *             properties:
     *               email:
     *                 type: string
     *                 example: "admin@biblioteca.com"
     *               senha:
     *                 type: string
     *                 example: "123456"
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/LoginResponse'
     *       400:
     *         description: Email e senha são obrigatórios
     *       401:
     *         description: Credenciais inválidas
     *       500:
     *         description: Erro interno do servidor
     */
    // Login
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({
                    error: 'Email e senha são obrigatórios'
                });
            }
            // Buscar secretário
            const secretario = await prisma_1.default.secretario.findUnique({
                where: { email }
            });
            if (!secretario) {
                return res.status(401).json({
                    error: 'Credenciais inválidas'
                });
            }
            // Verificar senha
            const senhaValida = await bcryptjs_1.default.compare(senha, secretario.senha);
            if (!senhaValida) {
                return res.status(401).json({
                    error: 'Credenciais inválidas'
                });
            }
            // Gerar token jwt
            const token = jsonwebtoken_1.default.sign({
                id: secretario.id,
                email: secretario.email,
                tipo: 'secretario'
            }, JWT_SECRET, { expiresIn: '24h' });
            res.json({
                message: 'Login realizado com sucesso',
                token,
                secretario: {
                    id: secretario.id,
                    nome: secretario.nome,
                    email: secretario.email
                }
            });
        }
        catch (error) {
            console.error('Erro ao fazer login:', error);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }
    /**
     * @swagger
     * /auth/me:
     *   get:
     *     summary: Obter dados do secretário logado
     *     tags: [Autenticação]
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados do secretário
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 secretario:
     *                   $ref: '#/components/schemas/Secretario'
     *       401:
     *         description: Não autorizado
     *       404:
     *         description: Secretário não encontrado
     *       500:
     *         description: Erro interno do servidor
     */
    // Verificar token (me)
    async me(req, res) {
        try {
            const secretario = await prisma_1.default.secretario.findUnique({
                where: { id: req.user.id },
                select: {
                    id: true,
                    nome: true,
                    email: true,
                    createdAt: true
                }
            });
            if (!secretario) {
                return res.status(404).json({
                    error: 'Secretário não encontrado'
                });
            }
            res.json({
                secretario
            });
        }
        catch (error) {
            console.error('Erro ao buscar dados do secretário:', error);
            res.status(500).json({
                error: 'Erro interno do servidor'
            });
        }
    }
}
exports.AuthController = AuthController;
exports.authController = new AuthController();
//# sourceMappingURL=authController.js.map