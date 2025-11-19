export declare class LivroService {
    criarLivro(dados: any): Promise<{
        id: number;
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    listarLivros(pagina?: number, limite?: number): Promise<{
        livros: {
            id: number;
            isbn: string;
            titulo: string;
            autor: string;
            editora: string;
            ano: number;
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
        id: number;
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    buscarLivrosPorTitulo(titulo: string): Promise<{
        id: number;
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    atualizarLivro(id: number, dados: any): Promise<{
        id: number;
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deletarLivro(id: number): Promise<{
        message: string;
    }>;
    listarLivrosDisponiveis(): Promise<{
        id: number;
        isbn: string;
        titulo: string;
        autor: string;
        editora: string;
        ano: number;
        disponivel: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
//# sourceMappingURL=livroService.d.ts.map