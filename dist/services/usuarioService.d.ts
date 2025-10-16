export declare class UsuarioService {
    criarUsuario(dados: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        nome: string;
        telefone: string;
    }>;
    listarUsuarios(pagina?: number, limite?: number): Promise<{
        usuarios: {
            emprestimosAtivos: number;
            _count: {
                emprestimos: number;
            };
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            nome: string;
            telefone: string;
        }[];
        paginacao: {
            pagina: number;
            limite: number;
            total: number;
            totalPaginas: number;
        };
    }>;
    buscarUsuarioPorId(id: number): Promise<{
        emprestimos: ({
            livro: {
                id: number;
                isbn: string;
                titulo: string;
                autor: string;
                editora: string;
                ano: number;
                disponivel: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            devolvido: boolean;
            livroId: number;
            usuarioId: number;
            dataEmprestimo: Date;
            dataDevolucao: Date | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        nome: string;
        telefone: string;
    }>;
    atualizarUsuario(id: number, dados: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        nome: string;
        telefone: string;
    }>;
    deletarUsuario(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=usuarioService.d.ts.map