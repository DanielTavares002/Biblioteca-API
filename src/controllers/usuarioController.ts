import { Request, Response } from 'express'
import prisma from '../prisma/client'

/**
 * Cria um novo usuário
 */
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone } = req.body

    // Validação básica
    if (!nome || !email || !telefone) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: nome, email, telefone' 
      })
    }

    // Verifica se email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuarioExistente) {
      return res.status(400).json({ 
        error: 'Já existe um usuário com este email' 
      })
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        telefone
      }
    })

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      usuario
    })
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao criar usuário' 
    })
  }
}

/**
 * Lista todos os usuários
 */
export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      orderBy: {
        nome: 'asc'
      },
      include: {
        emprestimos: {
          where: {
            devolvido: false
          },
          include: {
            livro: true
          }
        }
      }
    })

    res.json({
      message: 'Usuários recuperados com sucesso',
      count: usuarios.length,
      usuarios
    })
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao listar usuários' 
    })
  }
}

/**
 * Busca um usuário por ID
 */
export const buscarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const usuario = await prisma.usuario.findUnique({
      where: { 
        id: parseInt(id) 
      },
      include: {
        emprestimos: {
          include: {
            livro: true
          },
          orderBy: {
            dataEmprestimo: 'desc'
          }
        }
      }
    })

    if (!usuario) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      })
    }

    res.json({
      message: 'Usuário encontrado com sucesso',
      usuario
    })
  } catch (error) {
    console.error('Erro ao buscar usuário:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao buscar usuário' 
    })
  }
}

/**
 * Atualiza um usuário
 */
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { nome, email, telefone } = req.body

    // Verifica se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(id) }
    })

    if (!usuarioExistente) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      })
    }

    // Se estiver tentando mudar o email, verifica se não existe outro com mesmo email
    if (email && email !== usuarioExistente.email) {
      const emailExistente = await prisma.usuario.findUnique({
        where: { email }
      })

      if (emailExistente) {
        return res.status(400).json({ 
          error: 'Já existe outro usuário com este email' 
        })
      }
    }

    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
        telefone
      }
    })

    res.json({
      message: 'Usuário atualizado com sucesso',
      usuario
    })
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao atualizar usuário' 
    })
  }
}

/**
 * Deleta um usuário
 */
export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verifica se o usuário existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      include: {
        emprestimos: {
          where: {
            devolvido: false
          }
        }
      }
    })

    if (!usuarioExistente) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      })
    }

    // Verifica se o usuário tem empréstimos ativos
    if (usuarioExistente.emprestimos.length > 0) {
      return res.status(400).json({ 
        error: 'Não é possível deletar um usuário com empréstimos ativos' 
      })
    }

    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    })

    res.json({ 
      message: 'Usuário deletado com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao deletar usuário:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao deletar usuário' 
    })
  }
}