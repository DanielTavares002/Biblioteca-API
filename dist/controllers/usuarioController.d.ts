import { Request, Response } from 'express';
/**
 * Cria um novo usuário
 */
export declare const criarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Lista todos os usuários
 */
export declare const listarUsuarios: (req: Request, res: Response) => Promise<void>;
/**
 * Busca um usuário por ID
 */
export declare const buscarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Atualiza um usuário
 */
export declare const atualizarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
/**
 * Deleta um usuário
 */
export declare const deletarUsuario: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=usuarioController.d.ts.map