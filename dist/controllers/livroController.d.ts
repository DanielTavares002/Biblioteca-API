import { Request, Response } from 'express';
/**
 * Cria um novo livro
 */
export declare const criarLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Lista todos os livros
 */
export declare const listarLivros: (req: Request, res: Response) => Promise<void>;
/**
 * Busca um livro por ID
 */
export declare const buscarLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Atualiza um livro
 */
export declare const atualizarLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Deleta um livro
 */
export declare const deletarLivro: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Lista livros disponíveis
 */
export declare const buscarLivrosDisponiveis: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=livroController.d.ts.map