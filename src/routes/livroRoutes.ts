import { Router } from 'express'
import {
  criarLivro,
  listarLivros,
  buscarLivro,
  atualizarLivro,
  deletarLivro,
  buscarLivrosDisponiveis
} from '../controllers/livroController'

const router = Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Livro:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - isbn
 *         - editora
 *         - ano
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do livro
 *         titulo:
 *           type: string
 *           description: Título do livro
 *         autor:
 *           type: string
 *           description: Autor do livro
 *         isbn:
 *           type: string
 *           description: ISBN do livro
 *         editora:
 *           type: string
 *           description: Editora do livro
 *         ano:
 *           type: integer
 *           description: Ano de publicação
 *         disponivel:
 *           type: boolean
 *           description: Status de disponibilidade
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     LivroInput:
 *       type: object
 *       required:
 *         - titulo
 *         - autor
 *         - isbn
 *         - editora
 *         - ano
 *       properties:
 *         titulo:
 *           type: string
 *         autor:
 *           type: string
 *         isbn:
 *           type: string
 *         editora:
 *           type: string
 *         ano:
 *           type: integer
 *         disponivel:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros da biblioteca
 */

/**
 * @swagger
 * /api/livros:
 *   post:
 *     summary: Criar um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LivroInput'
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', criarLivro)

/**
 * @swagger
 * /api/livros:
 *   get:
 *     summary: Listar todos os livros
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/', listarLivros)

/**
 * @swagger
 * /api/livros/disponiveis:
 *   get:
 *     summary: Listar livros disponíveis
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Livro'
 */
router.get('/disponiveis', buscarLivrosDisponiveis)

/**
 * @swagger
 * /api/livros/{id}:
 *   get:
 *     summary: Buscar livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', buscarLivro)

/**
 * @swagger
 * /api/livros/{id}:
 *   put:
 *     summary: Atualizar livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LivroInput'
 *     responses:
 *       200:
 *         description: Livro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       404:
 *         description: Livro não encontrado
 */
router.put('/:id', atualizarLivro)

/**
 * @swagger
 * /api/livros/{id}:
 *   delete:
 *     summary: Deletar livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', deletarLivro)

export default router