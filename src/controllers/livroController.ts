import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { LivroCreateSchema } from '../types';

export const livroController = {
  async listarLivros(req: Request, res: Response) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      
      const where = search ? {
        OR: [
          { titulo: { contains: search as string, mode: 'insensitive' } },
          { autor: { contains: search as string, mode: 'insensitive' } },
          { categoria: { contains: search as string, mode: 'insensitive' } },
        ],
      } : {};

      const [livros, total] = await Promise.all([
        prisma.livro.findMany({
          where,
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          orderBy: { titulo: 'asc' },
        }),
        prisma.livro.count({ where }),
      ]);

      res.json({
        success: true,
        data: livros,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar livros',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  async obterLivro(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const livro = await prisma.livro.findUnique({
        where: { id: Number(id) },
      });

      if (!livro) {
        return res.status(404).json({
          success: false,
          message: 'Livro não encontrado',
        });
      }

      res.json({
        success: true,
        data: livro,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao obter livro',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  async criarLivro(req: Request, res: Response) {
    try {
      const dadosValidados = LivroCreateSchema.parse(req.body);
      
      // Verificar se ISBN já existe
      const livroExistente = await prisma.livro.findUnique({
        where: { isbn: dadosValidados.isbn },
      });

      if (livroExistente) {
        return res.status(400).json({
          success: false,
          message: 'ISBN já cadastrado',
        });
      }

      const livro = await prisma.livro.create({
        data: dadosValidados,
      });

      res.status(201).json({
        success: true,
        message: 'Livro criado com sucesso',
        data: livro,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar livro',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  // ... manter os outros métodos similares com prisma
};