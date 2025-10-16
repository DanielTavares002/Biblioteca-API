import prisma from '../utils/prisma';

export class LivroService {
  
  async criarLivro(dados: any) {
    try {
      // Verificar se ISBN já existe
      const livroExistente = await prisma.livro.findUnique({
        where: { isbn: dados.isbn }
      });

      if (livroExistente) {
        throw new Error('Já existe um livro com este ISBN');
      }

      // Criar o livro
      const livro = await prisma.livro.create({
        data: {
          titulo: dados.titulo,
          autor: dados.autor,
          isbn: dados.isbn,
          editora: dados.editora,
          ano: dados.ano,
          disponivel: true
        }
      });

      return livro;
    } catch (error: any) {
      throw new Error(`Erro ao criar livro: ${error.message}`);
    }
  }

  async listarLivros(pagina: number = 1, limite: number = 10) {
    try {
      const skip = (pagina - 1) * limite;

      const [livros, total] = await Promise.all([
        prisma.livro.findMany({
          skip,
          take: limite,
          orderBy: { titulo: 'asc' }
        }),
        prisma.livro.count()
      ]);

      return {
        livros,
        paginacao: {
          pagina,
          limite,
          total,
          totalPaginas: Math.ceil(total / limite)
        }
      };
    } catch (error: any) {
      throw new Error(`Erro ao listar livros: ${error.message}`);
    }
  }

  async buscarLivroPorId(id: number) {
    try {
      const livro = await prisma.livro.findUnique({
        where: { id }
      });

      if (!livro) {
        throw new Error('Livro não encontrado');
      }

      return livro;
    } catch (error: any) {
      throw new Error(`Erro ao buscar livro: ${error.message}`);
    }
  }

  async buscarLivrosPorTitulo(titulo: string) {
    try {
      const livros = await prisma.livro.findMany({
        where: {
          titulo: {
            contains: titulo
          }
        }
      });

      return livros;
    } catch (error: any) {
      throw new Error(`Erro ao buscar livros por título: ${error.message}`);
    }
  }

  async atualizarLivro(id: number, dados: any) {
    try {
      // Verificar se livro existe
      const livroExistente = await prisma.livro.findUnique({
        where: { id }
      });

      if (!livroExistente) {
        throw new Error('Livro não encontrado');
      }

      // Se estiver atualizando ISBN, verificar se não conflita
      if (dados.isbn && dados.isbn !== livroExistente.isbn) {
        const isbnExistente = await prisma.livro.findUnique({
          where: { isbn: dados.isbn }
        });

        if (isbnExistente) {
          throw new Error('Já existe um livro com este ISBN');
        }
      }

      const livro = await prisma.livro.update({
        where: { id },
        data: dados
      });

      return livro;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar livro: ${error.message}`);
    }
  }

  async deletarLivro(id: number) {
    try {
      // Verificar se livro existe
      const livroExistente = await prisma.livro.findUnique({
        where: { id },
        include: {
          emprestimos: {
            where: {
              devolvido: false
            }
          }
        }
      });

      if (!livroExistente) {
        throw new Error('Livro não encontrado');
      }

      if (livroExistente.emprestimos.length > 0) {
        throw new Error('Não é possível deletar um livro com empréstimos ativos');
      }

      await prisma.livro.delete({
        where: { id }
      });

      return { message: 'Livro deletado com sucesso' };
    } catch (error: any) {
      throw new Error(`Erro ao deletar livro: ${error.message}`);
    }
  }

  async listarLivrosDisponiveis() {
    try {
      const livros = await prisma.livro.findMany({
        where: {
          disponivel: true
        }
      });

      return livros;
    } catch (error: any) {
      throw new Error(`Erro ao listar livros disponíveis: ${error.message}`);
    }
  }
}