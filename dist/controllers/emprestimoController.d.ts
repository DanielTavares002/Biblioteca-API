import { Request, Response } from 'express';
/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - livroId
 *               - usuarioId
 *             properties:
 *               livroId:
 *                 type: integer
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
export declare const criarEmprestimo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: query
 *         name: ativos
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas empréstimos ativos
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
export declare const listarEmprestimos: (req: Request, res: Response) => Promise<void>;
/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo por ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *       404:
 *         description: Empréstimo não encontrado
 */
export declare const buscarEmprestimo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra a devolução de um livro
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 */
export declare const devolverLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Lista histórico de empréstimos de um usuário
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico do usuário
 */
export declare const historicoUsuario: (req: Request, res: Response) => Promise<void>;
/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista apenas empréstimos ativos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos ativos
 */
export declare const listarEmprestimosAtivos: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=emprestimoController.d.ts.map