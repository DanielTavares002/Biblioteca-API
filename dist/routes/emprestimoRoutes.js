"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const emprestimoController_1 = require("../controllers/emprestimoController");
const router = (0, express_1.Router)();
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
router.post('/', emprestimoController_1.criarEmprestimo);
/**
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 */
router.get('/', emprestimoController_1.listarEmprestimos);
/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista empréstimos ativos
 *     tags: [Empréstimos]
 */
router.get('/ativos', emprestimoController_1.listarEmprestimosAtivos);
/**
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Histórico de empréstimos do usuário
 *     tags: [Empréstimos]
 */
router.get('/usuarios/:usuarioId', emprestimoController_1.historicoUsuario);
/**
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca empréstimo por ID
 *     tags: [Empréstimos]
 */
router.get('/:id', emprestimoController_1.buscarEmprestimo);
/**
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra devolução de livro
 *     tags: [Empréstimos]
 */
router.patch('/:id/devolucao', emprestimoController_1.devolverLivro);
exports.default = router;
//# sourceMappingURL=emprestimoRoutes.js.map