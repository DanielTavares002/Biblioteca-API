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
            titulo: string;
            autor: string;
            isbn: string;
            id: number;
        };
        usuario: {
            nome: string;
            email: string;
            id: number;
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
    listarTodosEmprestimos(): Promise<({
        livro: {
            titulo: string;
            autor: string;
            isbn: string;
            id: number;
        };
        usuario: {
            nome: string;
            email: string;
            id: number;
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
            titulo: string;
            autor: string;
            isbn: string;
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
            titulo: string;
            autor: string;
            isbn: string;
            id: number;
        };
        usuario: {
            nome: string;
            email: string;
            id: number;
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
    deletarEmprestimo(id: number): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=emprestimoService.d.ts.map