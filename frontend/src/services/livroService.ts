import api from './api';

export interface Livro {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
    editora: string;
    ano: number;
    disponivel: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface LivroResponse {
    message: string;
    livros: Livro[];
    paginacao?: {
        pagina: number;
        limite: number;
        total: number;
        totalPaginas: number;
    };
}

export const livroService = {
    async getAll(pagina: number = 1, limite: number = 10): Promise<LivroResponse> {
        const response = await api.get(`/livros?pagina=${pagina}&limite=${limite}`);
        return response.data;
    },

    async getById(id: number): Promise<{ message: string; livro: Livro }> {
        const response = await api.get(`/livros/${id}`);
        return response.data;
    },

    async create(livro: Omit<Livro, 'id'>): Promise<{ message: string; livro: Livro }> {
        const response = await api.post('/livros', livro);
        return response.data;
    },

    async update(id: number, livro: Partial<Livro>): Promise<{ message: string; livro: Livro }> {
        const response = await api.put(`/livros/${id}`, livro);
        return response.data;
    },

    async delete(id: number): Promise<{ message: string }> {
        const response = await api.delete(`/livros/${id}`);
        return response.data;
    },

    async buscarPorTitulo(titulo: string): Promise<LivroResponse> {
        const response = await api.get(`/livros/buscar?titulo=${titulo}`);
        return response.data;
    }
};