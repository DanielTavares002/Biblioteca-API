import { Request, Response } from 'express';
import { EmprestimoService } from '../services';

const emprestimoService = new EmprestimoService();

/**
 * Cria um novo empréstimo
 */
export const criarEmprestimo = async (req: Request, res: Response) => {
  try {
    const { livroId, usuarioId } = req.body;

    // Validação básica
    if (!livroId || !usuarioId) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: livroId, usuarioId' 
      });
    }

    const emprestimo = await emprestimoService.realizarEmprestimo(
      parseInt(usuarioId),
      parseInt(livroId)
    );

    res.status(201).json({
      message: 'Empréstimo realizado com sucesso',
      emprestimo
    });
  } catch (error: any) {
    console.error('Erro ao criar empréstimo:', error);
    res.status(400).json({ 
      error: error.message 
    });
  }
};

/**
 * Lista todos os empréstimos
 */
export const listarEmprestimos = async (req: Request, res: Response) => {
  try {
    const emprestimos = await emprestimoService.listarEmprestimosAtivos();

    res.json({
      message: 'Empréstimos recuperados com sucesso',
      count: emprestimos.length,
      emprestimos
    });
  } catch (error: any) {
    console.error('Erro ao listar empréstimos:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * Busca um empréstimo por ID
 */
export const buscarEmprestimo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const emprestimo = await emprestimoService.buscarEmprestimoPorId(parseInt(id));

    res.json({
      message: 'Empréstimo encontrado com sucesso',
      emprestimo
    });
  } catch (error: any) {
    console.error('Erro ao buscar empréstimo:', error);
    if (error.message === 'Empréstimo não encontrado') {
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
 * Devolve um livro
 */
export const devolverLivro = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const emprestimo = await emprestimoService.devolverLivro(parseInt(id));

    res.json({
      message: 'Livro devolvido com sucesso',
      emprestimo
    });
  } catch (error: any) {
    console.error('Erro ao devolver livro:', error);
    if (error.message === 'Empréstimo não encontrado') {
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
 * Lista empréstimos ativos
 */
export const listarEmprestimosAtivos = async (req: Request, res: Response) => {
  try {
    const emprestimos = await emprestimoService.listarEmprestimosAtivos();

    res.json({
      message: 'Empréstimos ativos recuperados com sucesso',
      count: emprestimos.length,
      emprestimos
    });
  } catch (error: any) {
    console.error('Erro ao listar empréstimos ativos:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};