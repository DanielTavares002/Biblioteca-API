export declare class UsuarioService {
    criarUsuario(dados: any): Promise<{
        nome: string;
        email: string;
        telefone: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listarUsuarios(pagina?: number, limite?: number): Promise<{
        usuarios: {
            emprestimosAtivos: number;
            _count: {
                emprestimos: number;
            };
            nome: string;
            email: string;
            telefone: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
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
                titulo: string;
                autor: string;
                isbn: string;
                editora: string;
                ano: number;
                id: number;
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
        nome: string;
        email: string;
        telefone: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    atualizarUsuario(id: number, dados: any): Promise<{
        nome: string;
        email: string;
        telefone: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletarUsuario(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=usuarioService.d.ts.map