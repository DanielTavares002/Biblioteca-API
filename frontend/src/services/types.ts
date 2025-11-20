export interface Usuario {
    id?: number;
    nome: string;
    email: string;
    telefone: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsuarioPaginacao {
    pagina: number;
    limite: number;
    total: number;
    totalPaginas: number;
}

export interface UsuarioResponse {
    message: string;
    usuarios: Usuario[];
    paginacao: UsuarioPaginacao;
}

export interface Emprestimo {
  id?: number;
  livroId: number;
  usuarioId: number;
  dataEmprestimo: string;
  dataDevolucao?: string;
  devolvido: boolean;
  createdAt?: string;
  updatedAt?: string;
  livro?: {
    id: number;
    titulo: string;
    autor: string;
    isbn: string;
  };
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface EmprestimoResponse {
  message: string;
  emprestimos: Emprestimo[];
  count?: number;
}