import { Request, Response } from 'express';
import { EmprestimoService } from '../services/emprestimoService';

const emprestimoService = new EmprestimoService();

/**
 * @swagger
 * /emprestimos:
 *   post:
 *     summary: Cria um novo empréstimo
 *     tags: [Empréstimos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - livroId
 *               - usuarioId
 *             properties:
 *               livroId:
 *                 type: integer
 *                 example: 1
 *               usuarioId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Empréstimo criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
export const criarEmprestimo = async (req: Request, res: Response) => {
  try {
    const { livroId, usuarioId } = req.body;

    if (!livroId || !usuarioId) {
      return res.status(400).json({ 
        error: 'livroId e usuarioId são obrigatórios' 
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
 * @swagger
 * /emprestimos:
 *   get:
 *     summary: Lista todos os empréstimos
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: query
 *         name: ativos
 *         schema:
 *           type: boolean
 *         description: Filtrar apenas empréstimos ativos
 *     responses:
 *       200:
 *         description: Lista de empréstimos
 */
export const listarEmprestimos = async (req: Request, res: Response) => {
  try {
    const { ativos } = req.query;
    
    let emprestimos;
    if (ativos === 'true') {
      emprestimos = await emprestimoService.listarEmprestimosAtivos();
    } else {
      // Este método PRECISA existir no EmprestimoService
      emprestimos = await emprestimoService.listarTodosEmprestimos();
    }

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
 * @swagger
 * /emprestimos/{id}:
 *   get:
 *     summary: Busca um empréstimo por ID
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Empréstimo encontrado
 *       404:
 *         description: Empréstimo não encontrado
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
 * @swagger
 * /emprestimos/{id}/devolucao:
 *   patch:
 *     summary: Registra a devolução de um livro
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Livro devolvido com sucesso
 *       404:
 *         description: Empréstimo não encontrado
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
 * @swagger
 * /emprestimos/usuarios/{usuarioId}:
 *   get:
 *     summary: Lista histórico de empréstimos de um usuário
 *     tags: [Empréstimos]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Histórico do usuário
 */
export const historicoUsuario = async (req: Request, res: Response) => {
  try {
    const { usuarioId } = req.params;

    const emprestimos = await emprestimoService.historicoUsuario(parseInt(usuarioId));

    res.json({
      message: 'Histórico de empréstimos recuperado com sucesso',
      count: emprestimos.length,
      emprestimos
    });
  } catch (error: any) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * @swagger
 * /emprestimos/ativos:
 *   get:
 *     summary: Lista apenas empréstimos ativos
 *     tags: [Empréstimos]
 *     responses:
 *       200:
 *         description: Lista de empréstimos ativos
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