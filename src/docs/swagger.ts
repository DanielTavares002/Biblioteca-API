import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../../package.json';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca API',
      version,
      description: 'API para gerenciamento de biblioteca',
      contact: {
        name: 'Suporte',
        email: 'suporte@biblioteca.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Livro: {
          type: 'object',
          required: ['titulo', 'autor', 'isbn', 'editora', 'anoPublicacao', 'categoria'],
          properties: {
            id: { type: 'integer', example: 1 },
            titulo: { type: 'string', example: 'Dom Casmurro' },
            autor: { type: 'string', example: 'Machado de Assis' },
            isbn: { type: 'string', example: '9788535914843' },
            editora: { type: 'string', example: 'Companhia das Letras' },
            anoPublicacao: { type: 'integer', example: 1899 },
            categoria: { type: 'string', example: 'Literatura Brasileira' },
            status: { 
              type: 'string', 
              enum: ['DISPONIVEL', 'EMPRESTADO', 'RESERVADO', 'MANUTENCAO'],
              example: 'DISPONIVEL'
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Usuario: {
          type: 'object',
          required: ['nome', 'email'],
          properties: {
            id: { type: 'integer', example: 1 },
            nome: { type: 'string', example: 'João Silva' },
            email: { type: 'string', format: 'email', example: 'joao@email.com' },
            telefone: { type: 'string', example: '(11) 99999-9999' },
            endereco: { type: 'string', example: 'Rua A, 123' },
            tipo: { 
              type: 'string', 
              enum: ['COMUM', 'FUNCIONARIO', 'ADMIN'],
              example: 'COMUM'
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Emprestimo: {
          type: 'object',
          required: ['livroId', 'usuarioId', 'dataDevolucaoPrevista'],
          properties: {
            id: { type: 'integer', example: 1 },
            livroId: { type: 'integer', example: 1 },
            usuarioId: { type: 'integer', example: 1 },
            dataEmprestimo: { type: 'string', format: 'date-time' },
            dataDevolucaoPrevista: { type: 'string', format: 'date-time' },
            dataDevolucaoReal: { type: 'string', format: 'date-time' },
            status: { 
              type: 'string', 
              enum: ['ATIVO', 'DEVOLVIDO', 'ATRASADO', 'CANCELADO'],
              example: 'ATIVO'
            },
            multa: { type: 'number', example: 0 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            error: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);