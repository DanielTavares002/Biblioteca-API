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
 */
router.post('/', criarEmprestimo)

/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 */
router.get('/', listarEmprestimos)

/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista empréstimos ativos
 *     tags: [Empréstimos]
 */
router.get('/ativos', listarEmprestimosAtivos)

/**
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Histórico de empréstimos do usuário
 *     tags: [Empréstimos]
 */
router.get('/usuarios/:usuarioId', historicoUsuario)

/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca empréstimo por ID
 *     tags: [Empréstimos]
 */
router.get('/:id', buscarEmprestimo)

/**
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra devolução de livro
 *     tags: [Empréstimos]
 */
router.patch('/:id/devolucao', devolverLivro)

export default router