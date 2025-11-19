export interface CreateLivroDTO {
    titulo: string;
    autor: string;
    isbn: string;
    editora: string;
    ano: number;
}
export interface UpdateLivroDTO {
    titulo?: string;
    autor?: string;
    isbn?: string;
    editora?: string;
    ano?: number;
    disponivel?: boolean;
}
export interface CreateUsuarioDTO {
    nome: string;
    email: string;
    telefone: string;
}
export interface UpdateUsuarioDTO {
    nome?: string;
    email?: string;
    telefone?: string;
}
//# sourceMappingURL=index.d.ts.map