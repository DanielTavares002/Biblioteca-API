import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { UsuarioSchema } from '../types';

export const usuarioController = {
  // Listar todos os usuários
  async listarUsuarios(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        orderBy: { nome: 'asc' },
      });

      res.json({
        success: true,
        data: usuarios,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao listar usuários',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  // Criar novo usuário
  async criarUsuario(req: Request, res: Response) {
    try {
      const dadosValidados = UsuarioSchema.parse(req.body);
      
      // Verificar se email já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: dadosValidados.email },
      });

      if (usuarioExistente) {
        return res.status(400).json({
          success: false,
          message: 'Email já cadastrado',
        });
      }

      const usuario = await prisma.usuario.create({
        data: dadosValidados,
      });

      res.status(201).json({
        success: true,
        message: 'Usuário criado com sucesso',
        data: usuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao criar usuário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },

  // Obter usuário por ID
  async obterUsuario(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await prisma.usuario.findUnique({
        where: { id: Number(id) },
        include: {
          emprestimos: {
            include: {
              livro: true,
            },
            orderBy: {
              dataEmprestimo: 'desc',
            },
          },
        },
      });

      if (!usuario) {
        return res.status(404).json({
          success: false,
          message: 'Usuário não encontrado',
        });
      }

      res.json({
        success: true,
        data: usuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erro ao obter usuário',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      });
    }
  },
};