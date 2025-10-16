import { Request, Response } from 'express';
import { LivroService } from '../services/livroService';

const livroService = new LivroService();

/**
 * Cria um novo livro
 */
export const criarLivro = async (req: Request, res: Response) => {
  try {
    const { titulo, autor, isbn, editora, ano } = req.body;

    // Validação básica
    if (!titulo || !autor || !isbn || !editora || !ano) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: titulo, autor, isbn, editora, ano' 
      });
    }

    const livro = await livroService.criarLivro({
      titulo,
      autor,
      isbn,
      editora,
      ano: parseInt(ano)
    });

    res.status(201).json({
      message: 'Livro criado com sucesso',
      livro
    });
  } catch (error: any) {
    console.error('Erro ao criar livro:', error);
    res.status(400).json({ 
      error: error.message 
    });
  }
};

/**
 * Lista todos os livros
 */
export const listarLivros = async (req: Request, res: Response) => {
  try {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = parseInt(req.query.limite as string) || 10;

    const resultado = await livroService.listarLivros(pagina, limite);

    res.json({
      message: 'Livros recuperados com sucesso',
      ...resultado
    });
  } catch (error: any) {
    console.error('Erro ao listar livros:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * Busca um livro por ID
 */
export const buscarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const livro = await livroService.buscarLivroPorId(parseInt(id));

    res.json({
      message: 'Livro encontrado com sucesso',
      livro
    });
  } catch (error: any) {
    console.error('Erro ao buscar livro:', error);
    if (error.message === 'Livro não encontrado') {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * Atualiza um livro
 */
export const atualizarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titulo, autor, isbn, editora, ano, disponivel } = req.body;

    const livro = await livroService.atualizarLivro(parseInt(id), {
      titulo,
      autor,
      isbn,
      editora,
      ano: ano ? parseInt(ano) : undefined,
      disponivel
    });

    res.json({
      message: 'Livro atualizado com sucesso',
      livro
    });
  } catch (error: any) {
    console.error('Erro ao atualizar livro:', error);
    if (error.message === 'Livro não encontrado') {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(400).json({ 
      error: error.message 
    });
  }
};

/**
 * Deleta um livro
 */
export const deletarLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await livroService.deletarLivro(parseInt(id));

    res.json({
      message: resultado.message
    });
  } catch (error: any) {
    console.error('Erro ao deletar livro:', error);
    if (error.message === 'Livro não encontrado') {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(400).json({ 
      error: error.message 
    });
  }
};

/**
 * Lista livros disponíveis
 */
export const buscarLivrosDisponiveis = async (req: Request, res: Response) => {
  try {
    const livros = await livroService.listarLivrosDisponiveis();

    res.json({
      message: 'Livros disponíveis recuperados com sucesso',
      count: livros.length,
      livros
    });
  } catch (error: any) {
    console.error('Erro ao buscar livros disponíveis:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * Busca livros por título
 */
export const buscarLivrosPorTitulo = async (req: Request, res: Response) => {
  try {
    const { titulo } = req.query;

    if (!titulo || typeof titulo !== 'string') {
      return res.status(400).json({ 
        error: 'Parâmetro "titulo" é obrigatório' 
      });
    }

    const livros = await livroService.buscarLivrosPorTitulo(titulo);

    res.json({
      message: 'Livros encontrados com sucesso',
      count: livros.length,
      livros
    });
  } catch (error: any) {
    console.error('Erro ao buscar livros por título:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};