import { Router } from 'express'
import {
  criarEmprestimo,
  listarEmprestimos,
  buscarEmprestimo,
  devolverLivro,
  listarEmprestimosAtivos,
  historicoUsuario
} from '../controllers/emprestimoController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Gerenciamento de empréstimos de livros
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       400:
 *         description: Dados inválidos ou livro indisponível
 */
router.post('/', criarEmprestimo)

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 emprestimos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Emprestimo'
 */
router.get('/', listarEmprestimos)

/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista empréstimos ativos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos ativos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 emprestimos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Emprestimo'
 */
router.get('/ativos', listarEmprestimosAtivos)

/**
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Histórico de empréstimos do usuário
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Histórico do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 emprestimos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Emprestimo'
 */
router.get('/usuarios/:usuarioId', historicoUsuario)

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca empréstimo por ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 */
router.get('/:id', buscarEmprestimo)

/**
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra devolução de livro
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Emprestimo'
 *       404:
 *         description: Empréstimo não encontrado
 */
router.patch('/:id/devolucao', devolverLivro)

export default router