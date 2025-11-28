import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalLivros,
      totalUsuarios,
      emprestimosAtivos,
      livrosDisponiveis
    ] = await Promise.all([
      prisma.livro.count(),
      prisma.usuario.count(),
      prisma.emprestimo.count({
        where: { devolvido: false }
      }),
      prisma.livro.count({
        where: { disponivel: true }
      })
    ]);

    res.json({
      totalLivros,
      totalUsuarios,
      emprestimosAtivos,
      livrosDisponiveis
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas do dashboard:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor' 
    });
  }
};