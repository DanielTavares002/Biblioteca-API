import { z } from 'zod';

export const LivroSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  isbn: z.string().min(10, "ISBN deve ter pelo menos 10 caracteres"),
  editora: z.string().min(1, "Editora é obrigatória"),
  anoPublicacao: z.number().int().min(1000).max(new Date().getFullYear()),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  status: z.enum(['DISPONIVEL', 'EMPRESTADO', 'RESERVADO', 'MANUTENCAO']).default('DISPONIVEL')
});

export const LivroCreateSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  autor: z.string().min(1, "Autor é obrigatório"),
  isbn: z.string().min(10, "ISBN deve ter pelo menos 10 caracteres"),
  editora: z.string().min(1, "Editora é obrigatória"),
  anoPublicacao: z.number().int().min(1000).max(new Date().getFullYear()),
  categoria: z.string().min(1, "Categoria é obrigatória"),
});

export const UsuarioSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  tipo: z.enum(["COMUM", "FUNCIONARIO", "ADMIN"]).default("COMUM"),
});

export const EmprestimoSchema = z.object({
  livroId: z.number().int().positive("ID do livro é obrigatório"), // ✅ Número
  usuarioId: z.number().int().positive("ID do usuário é obrigatório"), // ✅ Número
  dataDevolucaoPrevista: z.string().datetime("Data de devolução inválida"),
});

// Tipos TypeScript com números
export type Livro = z.infer<typeof LivroSchema> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Usuario = z.infer<typeof UsuarioSchema> & {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Emprestimo = z.infer<typeof EmprestimoSchema> & {
  id: number;
  dataEmprestimo: Date;
  dataDevolucaoReal?: Date;
  status: string;
  multa?: number;
  createdAt: Date;
  updatedAt: Date;
};