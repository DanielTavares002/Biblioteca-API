import { Request, Response } from 'express';
export declare class AuthController {
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
    registrar(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
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
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
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
    me(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
export declare const authController: AuthController;
//# sourceMappingURL=authController.d.ts.map