export declare class EmprestimoService {
    realizarEmprestimo(usuarioId: number, livroId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        devolvido: boolean;
        livroId: number;
        usuarioId: number;
        dataEmprestimo: Date;
        dataDevolucao: Date | null;
    }>;
    devolverLivro(emprestimoId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        devolvido: boolean;
        livroId: number;
        usuarioId: number;
        dataEmprestimo: Date;
        dataDevolucao: Date | null;
    }>;
    listarEmprestimosAtivos(): Promise<({
        livro: {
            id: number;
            isbn: string;
            titulo: string;
            autor: string;
        };
        usuario: {
            id: number;
            email: string;
            nome: string;
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
    })[]>;
    historicoUsuario(usuarioId: number): Promise<({
        livro: {
            isbn: string;
            titulo: string;
            autor: string;
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
    })[]>;
    buscarEmprestimoPorId(id: number): Promise<{
        livro: {
            id: number;
            isbn: string;
            titulo: string;
            autor: string;
        };
        usuario: {
            id: number;
            email: string;
            nome: string;
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
    }>;
}
//# sourceMappingURL=emprestimoService.d.ts.map