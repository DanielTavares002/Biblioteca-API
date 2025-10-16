import { Request, Response } from 'express';
/**
 * Cria um novo empréstimo
 */
export declare const criarEmprestimo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Lista todos os empréstimos
 */
export declare const listarEmprestimos: (req: Request, res: Response) => Promise<void>;
/**
 * Busca um empréstimo por ID
 */
export declare const buscarEmprestimo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Devolve um livro
 */
export declare const devolverLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Lista empréstimos ativos
 */
export declare const listarEmprestimosAtivos: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=emprestimoController.d.ts.map