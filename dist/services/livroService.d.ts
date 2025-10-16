export declare class LivroService {
    criarLivro(dados: any): Promise<{
        titulo: string;
        autor: string;
        isbn: string;
        editora: string;
        ano: number;
        id: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listarLivros(pagina?: number, limite?: number): Promise<{
        livros: {
            titulo: string;
            autor: string;
            isbn: string;
            editora: string;
            ano: number;
            id: number;
            disponivel: boolean;
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
    buscarLivroPorId(id: number): Promise<{
        titulo: string;
        autor: string;
        isbn: string;
        editora: string;
        ano: number;
        id: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    buscarLivrosPorTitulo(titulo: string): Promise<{
        titulo: string;
        autor: string;
        isbn: string;
        editora: string;
        ano: number;
        id: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    atualizarLivro(id: number, dados: any): Promise<{
        titulo: string;
        autor: string;
        isbn: string;
        editora: string;
        ano: number;
        id: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletarLivro(id: number): Promise<{
        message: string;
    }>;
    listarLivrosDisponiveis(): Promise<{
        titulo: string;
        autor: string;
        isbn: string;
        editora: string;
        ano: number;
        id: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=livroService.d.ts.map