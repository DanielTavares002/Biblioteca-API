import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Estatísticas do sistema
 */

/**
 * @swagger
 * /dashboard/stats:
 *   get:
 *     summary: Retorna estatísticas do sistema
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Estatísticas retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLivros:
 *                   type: integer
 *                   example: 150
 *                 totalUsuarios:
 *                   type: integer
 *                   example: 45
 *                 emprestimosAtivos:
 *                   type: integer
 *                   example: 12
 *                 livrosDisponiveis:
 *                   type: integer
 *                   example: 138
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/stats', authMiddleware, getDashboardStats);

export default router;