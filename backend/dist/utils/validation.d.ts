import { z } from 'zod';
export declare const createLivroSchema: z.ZodObject<{
    titulo: z.ZodString;
    autor: z.ZodString;
    isbn: z.ZodString;
    anoPublicacao: z.ZodNumber;
    quantidade: z.ZodNumber;
}, z.core.$strip>;
export declare const createUsuarioSchema: z.ZodObject<{
    nome: z.ZodString;
    email: z.ZodString;
    telefone: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=validation.d.ts.map