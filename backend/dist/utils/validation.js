"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsuarioSchema = exports.createLivroSchema = void 0;
const zod_1 = require("zod");
exports.createLivroSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1, "Título é obrigatório"),
    autor: zod_1.z.string().min(1, "Autor é obrigatório"),
    isbn: zod_1.z.string().length(13, "ISBN deve ter 13 caracteres"),
    anoPublicacao: zod_1.z.number().min(1000).max(new Date().getFullYear()),
    quantidade: zod_1.z.number().int().min(0)
});
exports.createUsuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(1, "Nome é obrigatório"),
    email: zod_1.z.string().email("Email inválido"),
    telefone: zod_1.z.string().optional()
});
//# sourceMappingURL=validation.js.map