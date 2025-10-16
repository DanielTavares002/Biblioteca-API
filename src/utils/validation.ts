import { z } from 'zod';

export const createLivroSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  isbn: z.string().length(13, "ISBN deve ter 13 caracteres"),
  anoPublicacao: z.number().min(1000).max(new Date().getFullYear()),
  quantidade: z.number().int().min(0)
});

export const createUsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional()
});