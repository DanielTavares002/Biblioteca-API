import { Request, Response } from 'express'
import prisma from '../prisma/client'

/**
 * Cria um novo livro
 */
export const criarLivro = async (req: Request, res: Response) => {
  try {
    const { titulo, autor, isbn, editora, ano } = req.body

    // Validação básica
    if (!titulo || !autor || !isbn || !editora || !ano) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: titulo, autor, isbn, editora, ano' 
      })
    }

    // Verifica se ISBN já existe
    const livroExistente = await prisma.livro.findUnique({
      where: { isbn }
    })

    if (livroExistente) {
      return res.status(400).json({ 
        error: 'Já existe um livro com este ISBN' 
      })
    }

    const livro = await prisma.livro.create({
      data: {
        titulo,
        autor,
        isbn,
        editora,
        ano: parseInt(ano)
      }
    })

    res.status(201).json({
      message: 'Livro criado com sucesso',
      livro
    })
  } catch (error) {
    console.error('Erro ao criar livro:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao criar livro' 
    })
  }
}

/**
 * Lista todos os livros
 */
export const listarLivros = async (req: Request, res: Response) => {
  try {
    const livros = await prisma.livro.findMany({
      orderBy: {
        titulo: 'asc'
      }
    })

    res.json({
      message: 'Livros recuperados com sucesso',
      count: livros.length,
      livros
    })
  } catch (error) {
    console.error('Erro ao listar livros:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao listar livros' 
    })
  }
}

/**
 * Busca um livro por ID
 */
export const buscarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const livro = await prisma.livro.findUnique({
      where: { 
        id: parseInt(id) 
      }
    })

    if (!livro) {
      return res.status(404).json({ 
        error: 'Livro não encontrado' 
      })
    }

    res.json({
      message: 'Livro encontrado com sucesso',
      livro
    })
  } catch (error) {
    console.error('Erro ao buscar livro:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao buscar livro' 
    })
  }
}

/**
 * Atualiza um livro
 */
export const atualizarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { titulo, autor, isbn, editora, ano, disponivel } = req.body

    // Verifica se o livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id: parseInt(id) }
    })

    if (!livroExistente) {
      return res.status(404).json({ 
        error: 'Livro não encontrado' 
      })
    }

    // Se estiver tentando mudar o ISBN, verifica se não existe outro com mesmo ISBN
    if (isbn && isbn !== livroExistente.isbn) {
      const isbnExistente = await prisma.livro.findUnique({
        where: { isbn }
      })

      if (isbnExistente) {
        return res.status(400).json({ 
          error: 'Já existe outro livro com este ISBN' 
        })
      }
    }

    const livro = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        autor,
        isbn,
        editora,
        ano: ano ? parseInt(ano) : undefined,
        disponivel
      }
    })

    res.json({
      message: 'Livro atualizado com sucesso',
      livro
    })
  } catch (error) {
    console.error('Erro ao atualizar livro:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao atualizar livro' 
    })
  }
}

/**
 * Deleta um livro
 */
export const deletarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Verifica se o livro existe
    const livroExistente = await prisma.livro.findUnique({
      where: { id: parseInt(id) }
    })

    if (!livroExistente) {
      return res.status(404).json({ 
        error: 'Livro não encontrado' 
      })
    }

    // Verifica se o livro está em algum empréstimo ativo
    const emprestimoAtivo = await prisma.emprestimo.findFirst({
      where: {
        livroId: parseInt(id),
        devolvido: false
      }
    })

    if (emprestimoAtivo) {
      return res.status(400).json({ 
        error: 'Não é possível deletar um livro que está emprestado' 
      })
    }

    await prisma.livro.delete({
      where: { id: parseInt(id) }
    })

    res.json({ 
      message: 'Livro deletado com sucesso' 
    })
  } catch (error) {
    console.error('Erro ao deletar livro:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao deletar livro' 
    })
  }
}

/**
 * Lista livros disponíveis
 */
export const buscarLivrosDisponiveis = async (req: Request, res: Response) => {
  try {
    const livros = await prisma.livro.findMany({
      where: {
        disponivel: true
      },
      orderBy: {
        titulo: 'asc'
      }
    })

    res.json({
      message: 'Livros disponíveis recuperados com sucesso',
      count: livros.length,
      livros
    })
  } catch (error) {
    console.error('Erro ao buscar livros disponíveis:', error)
    res.status(500).json({ 
      error: 'Erro interno do servidor ao buscar livros disponíveis' 
    })
  }
}