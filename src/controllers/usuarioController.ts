import { Request, Response } from 'express';
import { UsuarioService } from '../services';

const usuarioService = new UsuarioService();

/**
 * Cria um novo usuário
 */
export const criarUsuario = async (req: Request, res: Response) => {
  try {
    const { nome, email, telefone } = req.body;

    // Validação básica
    if (!nome || !email || !telefone) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios: nome, email, telefone' 
      });
    }

    const usuario = await usuarioService.criarUsuario({
      nome,
      email,
      telefone
    });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      usuario
    });
  } catch (error: any) {
    console.error('Erro ao criar usuário:', error);
    res.status(400).json({ 
      error: error.message 
    });
  }
};

/**
 * Lista todos os usuários
 */
export const listarUsuarios = async (req: Request, res: Response) => {
  try {
    const pagina = parseInt(req.query.pagina as string) || 1;
    const limite = parseInt(req.query.limite as string) || 10;

    const resultado = await usuarioService.listarUsuarios(pagina, limite);

    res.json({
      message: 'Usuários recuperados com sucesso',
      ...resultado
    });
  } catch (error: any) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ 
      error: error.message 
    });
  }
};

/**
 * Busca um usuário por ID
 */
export const buscarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await usuarioService.buscarUsuarioPorId(parseInt(id));

    res.json({
      message: 'Usuário encontrado com sucesso',
      usuario
    });
  } catch (error: any) {
    console.error('Erro ao buscar usuário:', error);
    if (error.message === 'Usuário não encontrado') {
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
 * Atualiza um usuário
 */
export const atualizarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;

    const usuario = await usuarioService.atualizarUsuario(parseInt(id), {
      nome,
      email,
      telefone
    });

    res.json({
      message: 'Usuário atualizado com sucesso',
      usuario
    });
  } catch (error: any) {
    console.error('Erro ao atualizar usuário:', error);
    if (error.message === 'Usuário não encontrado') {
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
 * Deleta um usuário
 */
export const deletarUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await usuarioService.deletarUsuario(parseInt(id));

    res.json({
      message: resultado.message
    });
  } catch (error: any) {
    console.error('Erro ao deletar usuário:', error);
    if (error.message === 'Usuário não encontrado') {
      return res.status(404).json({ 
        error: error.message 
      });
    }
    res.status(400).json({ 
      error: error.message 
    });
  }
};