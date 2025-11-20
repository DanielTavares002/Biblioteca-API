import api from './api';

export interface Emprestimo {
    id?: number;
    livroId: number;
    usuarioId: number;
    dataEmprestimo: string;
  dataDevolucao?: string;
  devolvido: boolean;
  createdAt?: string;
  updatedAt?: string;
  livro?: {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
  };
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface EmprestimoResponse {
  message: string;
  emprestimos: Emprestimo[];
  count?: number;
}

export const emprestimoService = {
    async getAll(ativos?: boolean): Promise<EmprestimoResponse> {
        const url = ativos ? '/emprestimos/ativos' : '/emprestimos';
        const response = await api.get(url);
        return response.data;
    },

    async getById(id: number): Promise<{ message: string; emprestimo: Emprestimo }> {
    const response = await api.get(`/emprestimos/${id}`);
    return response.data;
  },

  async create(emprestimo: { livroId: number; usuarioId: number }): Promise<{ message: string; emprestimo: Emprestimo }> {
    const response = await api.post('/emprestimos', emprestimo);
    return response.data;
  },

  async devolver(id: number): Promise<{ message: string; emprestimo: Emprestimo }> {
    const response = await api.patch(`/emprestimos/${id}/devolucao`);
    return response.data;
  },

  async getByUsuario(usuarioId: number): Promise<EmprestimoResponse> {
    const response = await api.get(`/emprestimos/usuarios/${usuarioId}`);
    return response.data;
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await api.delete(`/emprestimos/${id}`);
    return response.data;
  }
};