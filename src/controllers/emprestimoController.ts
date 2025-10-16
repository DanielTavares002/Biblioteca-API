import { Request, Response } from 'express'
import prisma from '../prisma/client'

/**
 * Cria um novo empréstimo
 */
export const criarEmprestimo = async (req: Request, res: Response) => {
  try {
    const { livroId, usuarioId } = req.body

    // Validação básica
    if (!livroId || !usuarioId) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: livroId, usuarioId' 
      })
    }

    // Verifica se o livro existe e está disponível
    const livro = await prisma.livro.findUnique({
      where: { id: parseInt(livroId) }
    })

    if (!livro) {
      return res.status(404).json({ 
        error: 'Livro não encontrado' 
      })
    }

    if (!livro.disponivel) {
      return res.status(400).json({ 
        error: 'Livro não está disponível para empréstimo' 
      })
    }

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(usuarioId) }
    })

    if (!usuario) {
      return res.status(404).json({ 
        error: 'Usuário não encontrado' 
      })
    }

    // Cria o empréstimo
    const emprestimo = await prisma.emprestimo.create({
      data: {
        livroId: parseInt(livroId),
        usuarioId: parseInt(usuarioId)
      },
      include: {
        livro: true,
        usuario: true
      }
    })

    // Atualiza o livro para indisponível
    await prisma.livro.update({
      where: { id: parseInt(livroId) },
      data: { disponivel: false }
    })

    res.status(201).json({
      message: 'Empréstimo realizado com sucesso',
      emprestimo
    })
  } catch (error) {
    console.error('Erro ao criar empréstimo:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao criar empréstimo' 
    })
  }
}

/**
 * Lista todos os empréstimos
 */
export const listarEmprestimos = async (req: Request, res: Response) => {
  try {
    const emprestimos = await prisma.emprestimo.findMany({
      include: {
        livro: true,
        usuario: true
      },
      orderBy: {
        dataEmprestimo: 'desc'
      }
    })

    res.json({
      message: 'Empréstimos recuperados com sucesso',
      count: emprestimos.length,
      emprestimos
    })
  } catch (error) {
    console.error('Erro ao listar empréstimos:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao listar empréstimos' 
    })
  }
}

/**
 * Lista empréstimos ativos
 */
export const listarEmprestimosAtivos = async (req: Request, res: Response) => {
  try {
    const emprestimos = await prisma.emprestimo.findMany({
      where: {
        devolvido: false
      },
      include: {
        livro: true,
        usuario: true
      },
      orderBy: {
        dataEmprestimo: 'desc'
      }
    })

    res.json({
      message: 'Empréstimos ativos recuperados com sucesso',
      count: emprestimos.length,
      emprestimos
    })
  } catch (error) {
    console.error('Erro ao listar empréstimos ativos:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao listar empréstimos ativos' 
    })
  }
}

/**
 * Busca um empréstimo por ID
 */
export const buscarEmprestimo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const emprestimo = await prisma.emprestimo.findUnique({
      where: { 
        id: parseInt(id) 
      },
      include: {
        livro: true,
        usuario: true
      }
    })

    if (!emprestimo) {
      return res.status(404).json({ 
        error: 'Empréstimo não encontrado' 
      })
    }

    res.json({
      message: 'Empréstimo encontrado com sucesso',
      emprestimo
    })
  } catch (error) {
    console.error('Erro ao buscar empréstimo:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao buscar empréstimo' 
    })
  }
}

/**
 * Devolve um livro (marca empréstimo como devolvido)
 */
export const devolverLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verifica se o empréstimo existe
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: parseInt(id) },
      include: {
        livro: true
      }
    })

    if (!emprestimo) {
      return res.status(404).json({ 
        error: 'Empréstimo não encontrado' 
      })
    }

    if (emprestimo.devolvido) {
      return res.status(400).json({ 
        error: 'Este livro já foi devolvido' 
      })
    }

    // Atualiza o empréstimo
    const emprestimoAtualizado = await prisma.emprestimo.update({
      where: { id: parseInt(id) },
      data: {
        devolvido: true,
        dataDevolucao: new Date()
      },
      include: {
        livro: true,
        usuario: true
      }
    })

    // Atualiza o livro para disponível
    await prisma.livro.update({
      where: { id: emprestimo.livroId },
      data: { disponivel: true }
    })

    res.json({
      message: 'Livro devolvido com sucesso',
      emprestimo: emprestimoAtualizado
    })
  } catch (error) {
    console.error('Erro ao devolver livro:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao devolver livro' 
    })
  }
}