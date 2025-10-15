import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { EmprestimoSchema } from '../types';

export const emprestimoController = {
  async realizarEmprestimo(req: Request, res: Response) {
    try {
      const dadosValidados = EmprestimoSchema.parse(req.body);

      // Verificar se livro existe usando Prisma
      const livro = await prisma.livro.findUnique({
        where: { id: dadosValidados.livroId },
      });

      if (!livro) {
        return res.status(404).json({
          success: false,
          message: 'Livro não encontrado',
        });
      }

      if (livro.status !== 'DISPONIVEL') {
        return res.status(400).json({
          success: false,
          message: `Livro não está disponível. Status atual: ${livro.status}`,
        });
      }

      // Verificar se usuário existe usando Prisma
      const usuario = await prisma.usuario.findUnique({
        where: { id: dadosValidados.usuarioId },
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      // Verificar se usuário tem empréstimos em atraso
      const emprestimosAtrasados = await prisma.emprestimo.count({
        where: {
          usuarioId: dadosValidados.usuarioId,
          status: 'ATRASADO',
        },
      });

      if (emprestimosAtrasados > 0) {
        return res.status(400).json({
          success: false,
          message: 'Usuário possui empréstimos em atraso',
        });
      }

      // Realizar empréstimo em transação
      const resultado = await prisma.$transaction(async (tx) => {
        // Criar empréstimo
        const emprestimo = await tx.emprestimo.create({
          data: {
            livroId: dadosValidados.livroId,
            usuarioId: dadosValidados.usuarioId,
            dataDevolucaoPrevista: new Date(dadosValidados.dataDevolucaoPrevista),
          },
        });

        // Atualizar status do livro
        await tx.livro.update({
          where: { id: dadosValidados.livroId },
          data: { status: 'EMPRESTADO' },
        });

        return emprestimo;
      });

      const emprestimoCompleto = await prisma.emprestimo.findUnique({
        where: { id: resultado.id },
        include: {
          livro: true,
          usuario: true,
        },
      });

      res.status(201).json({
        success: true,
        message: 'Empréstimo realizado com sucesso',
        data: emprestimoCompleto,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao realizar empréstimo',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  async devolverLivro(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const emprestimo = await prisma.emprestimo.findUnique({
        where: { id: Number(id) },
        include: { livro: true },
      });

      if (!emprestimo) {
        return res.status(404).json({
          success: false,
          message: 'Empréstimo não encontrado',
        });
      }

      if (emprestimo.status !== 'ATIVO') {
        return res.status(400).json({
          success: false,
          message: `Empréstimo já está ${emprestimo.status.toLowerCase()}`,
        });
      }

      const dataDevolucao = new Date();
      const dataPrevista = new Date(emprestimo.dataDevolucaoPrevista);
      let multa = 0;

      // Calcular multa se houver atraso
      if (dataDevolucao > dataPrevista) {
        const diasAtraso = Math.ceil(
          (dataDevolucao.getTime() - dataPrevista.getTime()) / (1000 * 60 * 60 * 24)
        );
        multa = diasAtraso * 2.0; // R$ 2,00 por dia de atraso
      }

      // Realizar devolução em transação
      const resultado = await prisma.$transaction(async (tx) => {
        // Atualizar empréstimo
        const emprestimoAtualizado = await tx.emprestimo.update({
          where: { id: Number(id) },
          data: {
            status: 'DEVOLVIDO',
            dataDevolucaoReal: dataDevolucao,
            multa,
          },
        });

        // Atualizar status do livro
        await tx.livro.update({
          where: { id: emprestimo.livroId },
          data: { status: 'DISPONIVEL' },
        });

        return emprestimoAtualizado;
      });

      res.json({
        success: true,
        message: multa > 0 
          ? `Livro devolvido com atraso. Multa aplicada: R$ ${multa.toFixed(2)}`
          : 'Livro devolvido com sucesso',
        data: resultado,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao devolver livro',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  async listarEmprestimos(req: Request, res: Response) {
    try {
      const { status, usuarioId } = req.query;

      const where: any = {};
      if (status) where.status = status;
      if (usuarioId) where.usuarioId = Number(usuarioId);

      const emprestimos = await prisma.emprestimo.findMany({
        where,
        include: {
          livro: true,
          usuario: true,
        },
        orderBy: { dataEmprestimo: 'desc' },
      });

      res.json({
        success: true,
        data: emprestimos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar empréstimos',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },
};