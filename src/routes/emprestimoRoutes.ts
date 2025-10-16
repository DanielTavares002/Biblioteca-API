import { Router } from 'express'
import {
  criarEmprestimo,
  listarEmprestimos,
  buscarEmprestimo,
  devolverLivro,
  listarEmprestimosAtivos
} from '../controllers/emprestimoController'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Emprestimo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         livroId:
 *           type: integer
 *         usuarioId:
 *           type: integer
 *         dataEmprestimo:
 *           type: string
 *           format: date-time
 *         dataDevolucao:
 *           type: string
 *           format: date-time
 *         devolvido:
 *           type: boolean
 *         livro:
 *           $ref: '#/components/schemas/Livro'
 *         usuario:
 *           $ref: '#/components/schemas/Usuario'
 *     EmprestimoInput:
 *       type: object
 *       required:
 *         - livroId
 *         - usuarioId
 *       properties:
 *         livroId:
 *           type: integer
 *         usuarioId:
 *           type: integer
 */

/**
 * @swagger
 * tags:
 *   name: Empréstimos
 *   description: Gerenciamento de empréstimos de livros
 */

/**
 * @swagger
 * /api/emprestimos:
 *   post:
 *     summary: Criar um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmprestimoInput'
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Livro não disponível ou dados inválidos
 */
router.post('/', criarEmprestimo)

/**
 * @swagger
 * /api/emprestimos:
 *   get:
 *     summary: Listar todos os empréstimos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
router.get('/', listarEmprestimos)

/**
 * @swagger
 * /api/emprestimos/ativos:
 *   get:
 *     summary: Listar empréstimos ativos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos ativos
 */
router.get('/ativos', listarEmprestimosAtivos)

/**
 * @swagger
 * /api/emprestimos/{id}:
 *   get:
 *     summary: Buscar empréstimo por ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *       404:
 *         description: Empréstimo não encontrado
 */
router.get('/:id', buscarEmprestimo)

/**
 * @swagger
 * /api/emprestimos/{id}/devolver:
 *   patch:
 *     summary: Devolver um livro
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do empréstimo
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *       404:
 *         description: Empréstimo não encontrado
 */
router.patch('/:id/devolver', devolverLivro)

export default router