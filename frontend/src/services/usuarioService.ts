import api from './api.ts';
import type { Usuario, UsuarioResponse } from './types';

export const usuarioService = {
    async getAll(pagina: number = 1, limite: number = 10): Promise<UsuarioResponse> {
        const response = await api.get(`/usuarios?pagina=${pagina}&limite=${limite}`);
        return response.data;
    },
    
    async getById(id: number): Promise<{ message: string; usuario: Usuario }> {
        const response = await api.get(`/usuarios/${id}`);
        return response.data;
    },

    async create(usuario: Omit<Usuario, 'id'>): Promise<{ message: string; usuario: Usuario }> {
        const response = await api.post('/usuarios', usuario);
        return response.data;
    },

    async update(id: number, usuario: Partial<Usuario>): Promise<{ message: string; usuario: Usuario }> {
        const response = await api.put(`/usuarios/${id}`, usuario);
        return response.data;
    },

    async delete(id: number): Promise<{ message: string }> {
        const response = await api.delete(`/usuarios/${id}`);
        return response.data;
    }
};