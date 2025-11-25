import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...')

  // Limpar tabelas existentes (cuidado em produção!)
  console.log('🧹 Limpando dados existentes...')
  await prisma.emprestimo.deleteMany()
  await prisma.livro.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.secretario.deleteMany()

  // Hash para senhas
  const hashedPassword = await bcrypt.hash('senha123', 10)

  // ========== CRIAR SECRETÁRIOS/ADMIN ==========
  console.log('👨‍💼 Criando secretários...')
  
  await prisma.secretario.createMany({
    data: [
      {
        nome: 'Administrador Sistema',
        email: 'admin@biblioteca.com',
        senha: hashedPassword
      },
      {
        nome: 'Maria Secretária',
        email: 'maria@biblioteca.com',
        senha: hashedPassword
      }
    ]
  })

  // ========== CRIAR USUÁRIOS ==========
  console.log('👥 Criando usuários...')
  
  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        nome: 'Ana Carolina Silva',
        email: 'ana.silva@email.com',
        telefone: '(11) 99999-1111',
        endereco: 'Rua das Flores, 123 - São Paulo, SP',
      },
      {
        nome: 'Carlos Eduardo Oliveira',
        email: 'carlos.oliveira@email.com',
        telefone: '(11) 99999-2222',
        endereco: 'Av. Paulista, 1000 - São Paulo, SP',
      },
      {
        nome: 'Mariana Santos Costa',
        email: 'mariana.costa@email.com',
        telefone: '(11) 99999-3333',
        endereco: 'Rua Augusta, 500 - São Paulo, SP',
      },
      {
        nome: 'Ricardo Almeida Pereira',
        email: 'ricardo.pereira@email.com',
        telefone: '(11) 99999-4444',
        endereco: 'Alameda Santos, 200 - São Paulo, SP',
      },
      {
        nome: 'Fernanda Lima Rodrigues',
        email: 'fernanda.rodrigues@email.com',
        telefone: '(11) 99999-5555',
        endereco: 'Rua da Consolação, 800 - São Paulo, SP',
      }
    ]
  })

  // ========== CRIAR LIVROS ==========
  console.log('📚 Criando livros...')
  
  const livros = await prisma.livro.createMany({
    data: [
      {
        titulo: 'Dom Casmurro',
        autor: 'Machado de Assis',
        isbn: '978-85-7232-144-9',
        editora: 'Editora Garnier',
        ano: 1899,
        disponivel: true
      },
      {
        titulo: '1984',
        autor: 'George Orwell',
        isbn: '978-85-359-0277-9',
        editora: 'Companhia das Letras',
        ano: 1949,
        disponivel: true
      },
      {
        titulo: 'O Cortiço',
        autor: 'Aluísio Azevedo',
        isbn: '978-85-7232-145-6',
        editora: 'Editora Garnier',
        ano: 1890,
        disponivel: true
      },
      {
        titulo: 'A Moreninha',
        autor: 'Joaquim Manuel de Macedo',
        isbn: '978-85-7232-146-3',
        editora: 'Editora Garnier',
        ano: 1844,
        disponivel: true
      },
      {
        titulo: 'O Pequeno Príncipe',
        autor: 'Antoine de Saint-Exupéry',
        isbn: '978-85-01-09269-5',
        editora: 'Agir Editora',
        ano: 1943,
        disponivel: true
      },
      {
        titulo: 'Harry Potter e a Pedra Filosofal',
        autor: 'J.K. Rowling',
        isbn: '978-85-325-2312-4',
        editora: 'Rocco',
        ano: 1997,
        disponivel: true
      },
      {
        titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
        autor: 'J.R.R. Tolkien',
        isbn: '978-85-359-0278-6',
        editora: 'Martins Fontes',
        ano: 1954,
        disponivel: true
      },
      {
        titulo: 'Cem Anos de Solidão',
        autor: 'Gabriel García Márquez',
        isbn: '978-85-01-09270-1',
        editora: 'Record',
        ano: 1967,
        disponivel: true
      },
      {
        titulo: 'O Alquimista',
        autor: 'Paulo Coelho',
        isbn: '978-85-254-1487-4',
        editora: 'Rocco',
        ano: 1988,
        disponivel: true
      },
      {
        titulo: 'A Revolução dos Bichos',
        autor: 'George Orwell',
        isbn: '978-85-359-0279-3',
        editora: 'Companhia das Letras',
        ano: 1945,
        disponivel: true
      },
      {
        titulo: 'O Nome da Rosa',
        autor: 'Umberto Eco',
        isbn: '978-85-01-09271-8',
        editora: 'Record',
        ano: 1980,
        disponivel: true
      },
      {
        titulo: 'Iracema',
        autor: 'José de Alencar',
        isbn: '978-85-7232-147-0',
        editora: 'Editora Garnier',
        ano: 1865,
        disponivel: true
      },
      {
        titulo: 'Memórias Póstumas de Brás Cubas',
        autor: 'Machado de Assis',
        isbn: '978-85-7232-148-7',
        editora: 'Editora Garnier',
        ano: 1881,
        disponivel: true
      },
      {
        titulo: 'O Guarani',
        autor: 'José de Alencar',
        isbn: '978-85-7232-149-4',
        editora: 'Editora Garnier',
        ano: 1857,
        disponivel: true
      },
      {
        titulo: 'O Hobbit',
        autor: 'J.R.R. Tolkien',
        isbn: '978-85-359-0280-9',
        editora: 'Martins Fontes',
        ano: 1937,
        disponivel: true
      }
    ]
  })

  // ========== CRIAR EMPRÉSTIMOS ==========
  console.log('📖 Criando empréstimos...')
  
  // Buscar IDs criados
  const usuariosCriados = await prisma.usuario.findMany()
  const livrosCriados = await prisma.livro.findMany()

  const ana = usuariosCriados.find(u => u.email === 'ana.silva@email.com')
  const carlos = usuariosCriados.find(u => u.email === 'carlos.oliveira@email.com')
  const mariana = usuariosCriados.find(u => u.email === 'mariana.costa@email.com')

  const domCasmurro = livrosCriados.find(l => l.titulo === 'Dom Casmurro')
  const revolucaoBichos = livrosCriados.find(l => l.titulo === 'A Revolução dos Bichos')
  const pequenoPrincipe = livrosCriados.find(l => l.titulo === 'O Pequeno Príncipe')
  const harryPotter = livrosCriados.find(l => l.titulo === 'Harry Potter e a Pedra Filosofal')

  // Empréstimos ativos
  await prisma.emprestimo.createMany({
    data: [
      {
        livroId: domCasmurro!.id,
        usuarioId: ana!.id,
        dataEmprestimo: new Date('2024-11-20'),
        dataDevolucao: new Date('2024-12-04'),
        devolvido: false
      },
      {
        livroId: revolucaoBichos!.id,
        usuarioId: carlos!.id,
        dataEmprestimo: new Date('2024-11-22'),
        dataDevolucao: new Date('2024-12-06'),
        devolvido: false
      }
    ]
  })

  // Empréstimos finalizados
  await prisma.emprestimo.createMany({
    data: [
      {
        livroId: pequenoPrincipe!.id,
        usuarioId: mariana!.id,
        dataEmprestimo: new Date('2024-10-15'),
        dataDevolucao: new Date('2024-10-28'),
        devolvido: true
      },
      {
        livroId: harryPotter!.id,
        usuarioId: ana!.id,
        dataEmprestimo: new Date('2024-10-10'),
        dataDevolucao: new Date('2024-10-25'),
        devolvido: true
      }
    ]
  })

  console.log('✅ Seed concluído com sucesso!')
  console.log('📊 Resumo:')
  console.log('   👨‍💼 2 secretários criados')
  console.log('   👥 5 usuários criados')
  console.log('   📚 15 livros criados') 
  console.log('   📖 4 empréstimos criados (2 ativos, 2 finalizados)')
  console.log('')
  console.log('🔑 Credenciais para teste:')
  console.log('   Admin: admin@biblioteca.com / senha123')
  console.log('   Usuário: ana.silva@email.com / senha123')
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })