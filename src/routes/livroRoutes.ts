import { Router } from 'express'
import {
  criarLivro,
  listarLivros,
  buscarLivro,
  atualizarLivro,
  deletarLivro,
  buscarLivrosDisponiveis,
  buscarLivrosPorTitulo
} from '../controllers/livroController'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Gerenciamento de livros
 */

/**
 * @swagger
 * /livros:
 *   post:
 *     summary: Cria um novo livro
 *     tags: [Livros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - autor
 *               - isbn
 *               - editora
 *               - ano
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Dom Casmurro"
 *               autor:
 *                 type: string
 *                 example: "Machado de Assis"
 *               isbn:
 *                 type: string
 *                 example: "1234567890123"
 *               editora:
 *                 type: string
 *                 example: "Editora Brasil"
 *               ano:
 *                 type: integer
 *                 example: 1899
 *     responses:
 *       201:
 *         description: Livro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Livro'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', criarLivro)

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
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
 *         description: Lista de livros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 livros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Livro'
 *                 paginacao:
 *                   type: object
 */
router.get('/', listarLivros)

/**
 * @swagger
 * /livros/disponiveis:
 *   get:
 *     summary: Lista livros disponíveis
 *     tags: [Livros]
 *     responses:
 *       200:
 *         description: Lista de livros disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 livros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Livro'
 */
router.get('/disponiveis', buscarLivrosDisponiveis)

/**
 * @swagger
 * /livros/buscar:
 *   get:
 *     summary: Busca livros por título
 *     tags: [Livros]
 *     parameters:
 *       - in: query
 *         name: titulo
 *         required: true
 *         schema:
 *           type: string
 *         description: Título para busca
 *     responses:
 *       200:
 *         description: Livros encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 livros:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Livro'
 */
router.get('/buscar', buscarLivrosPorTitulo)

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro por ID
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', buscarLivro)

/**
 * @swagger
 * /livros/{id}:
 *   put:
 *     summary: Atualiza um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               isbn:
 *                 type: string
 *               editora:
 *                 type: string
 *               ano:
 *                 type: integer
 *               disponivel:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Livro atualizado
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
 * /livros/{id}:
 *   delete:
 *     summary: Deleta um livro
 *     tags: [Livros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro deletado com sucesso
 *       404:
 *         description: Livro não encontrado
 */
router.delete('/:id', deletarLivro)

export default router