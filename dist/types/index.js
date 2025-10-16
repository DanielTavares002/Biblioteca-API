"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoSchema = exports.UsuarioSchema = exports.LivroCreateSchema = exports.LivroSchema = void 0;
const zod_1 = require("zod");
exports.LivroSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1, "Título é obrigatório"),
    autor: zod_1.z.string().min(1, "Autor é obrigatório"),
    isbn: zod_1.z.string().min(10, "ISBN deve ter pelo menos 10 caracteres"),
    editora: zod_1.z.string().min(1, "Editora é obrigatória"),
    anoPublicacao: zod_1.z.number().int().min(1000).max(new Date().getFullYear()),
    categoria: zod_1.z.string().min(1, "Categoria é obrigatória"),
    status: zod_1.z.enum(['DISPONIVEL', 'EMPRESTADO', 'RESERVADO', 'MANUTENCAO']).default('DISPONIVEL')
});
exports.LivroCreateSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1, "Título é obrigatório"),
    autor: zod_1.z.string().min(1, "Autor é obrigatório"),
    isbn: zod_1.z.string().min(10, "ISBN deve ter pelo menos 10 caracteres"),
    editora: zod_1.z.string().min(1, "Editora é obrigatória"),
    anoPublicacao: zod_1.z.number().int().min(1000).max(new Date().getFullYear()),
    categoria: zod_1.z.string().min(1, "Categoria é obrigatória"),
});
exports.UsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    telefone: zod_1.z.string().optional(),
    endereco: zod_1.z.string().optional(),
    tipo: zod_1.z.enum(["COMUM", "FUNCIONARIO", "ADMIN"]).default("COMUM"),
});
exports.EmprestimoSchema = zod_1.z.object({
    livroId: zod_1.z.number().int().positive("ID do livro é obrigatório"), // ✅ Número
    usuarioId: zod_1.z.number().int().positive("ID do usuário é obrigatório"), // ✅ Número
    dataDevolucaoPrevista: zod_1.z.string().datetime("Data de devolução inválida"),
});
//# sourceMappingURL=index.js.map