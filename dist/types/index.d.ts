import { z } from 'zod';
export declare const LivroSchema: any;
export declare const LivroCreateSchema: any;
export declare const UsuarioSchema: any;
export declare const EmprestimoSchema: any;
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
//# sourceMappingURL=index.d.ts.map