import prisma from '../utils/prisma';

export class UsuarioService {

  async criarUsuario(dados: any) {
    try {
      // Verificar se email já existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email: dados.email }
      });

      if (usuarioExistente) {
        throw new Error('Já existe um usuário com este email');
      }

      const usuario = await prisma.usuario.create({
        data: {
          nome: dados.nome,
          email: dados.email,
          telefone: dados.telefone
        }
      });

      return usuario;
    } catch (error: any) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  async listarUsuarios(pagina: number = 1, limite: number = 10) {
    try {
      const skip = (pagina - 1) * limite;

      const [usuarios, total] = await Promise.all([
        prisma.usuario.findMany({
          skip,
          take: limite,
          orderBy: { nome: 'asc' },
          include: {
            _count: {
              select: {
                emprestimos: {
                  where: {
                    devolvido: false
                  }
                }
              }
            }
          }
        }),
        prisma.usuario.count()
      ]);

      return {
        usuarios: usuarios.map(usuario => ({
          ...usuario,
          emprestimosAtivos: usuario._count.emprestimos
        })),
        paginacao: {
          pagina,
          limite,
          total,
          totalPaginas: Math.ceil(total / limite)
        }
      };
    } catch (error: any) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  async buscarUsuarioPorId(id: number) {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        include: {
          emprestimos: {
            include: {
              livro: true
            },
            orderBy: {
              dataEmprestimo: 'desc'
            }
          }
        }
      });

      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }

      return usuario;
    } catch (error: any) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }

  async atualizarUsuario(id: number, dados: any) {
    try {
      // Verificar se usuário existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id }
      });

      if (!usuarioExistente) {
        throw new Error('Usuário não encontrado');
      }

      // Se estiver atualizando email, verificar conflito
      if (dados.email && dados.email !== usuarioExistente.email) {
        const emailExistente = await prisma.usuario.findUnique({
          where: { email: dados.email }
        });

        if (emailExistente) {
          throw new Error('Já existe um usuário com este email');
        }
      }

      const usuario = await prisma.usuario.update({
        where: { id },
        data: dados
      });

      return usuario;
    } catch (error: any) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  async deletarUsuario(id: number) {
    try {
      // Verificar se usuário existe
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              emprestimos: {
                where: {
                  devolvido: false
                }
              }
            }
          }
        }
      });

      if (!usuarioExistente) {
        throw new Error('Usuário não encontrado');
      }

      // Verificar se há empréstimos ativos
      if (usuarioExistente._count.emprestimos > 0) {
        throw new Error('Não é possível deletar usuário com empréstimos ativos');
      }

      await prisma.usuario.delete({
        where: { id }
      });

      return { message: 'Usuário deletado com sucesso' };
    } catch (error: any) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}