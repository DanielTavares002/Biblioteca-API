import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biblioteca API',
      version: '1.0.0',
      description: 'API para gerenciamento de biblioteca com sistema de empréstimos',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      schemas: {
        Livro: {
          type: 'object',
          required: ['titulo', 'autor', 'isbn', 'editora', 'ano'],
          properties: {
            id: { type: 'integer' },
            titulo: { type: 'string' },
            autor: { type: 'string' },
            isbn: { type: 'string' },
            editora: { type: 'string' },
            ano: { type: 'integer' },
            disponivel: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Usuario: {
          type: 'object',
          required: ['nome', 'email', 'telefone'],
          properties: {
            id: { type: 'integer' },
            nome: { type: 'string' },
            email: { type: 'string' },
            telefone: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Emprestimo: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            livroId: { type: 'integer' },
            usuarioId: { type: 'integer' },
            dataEmprestimo: { type: 'string', format: 'date-time' },
            dataDevolucao: { type: 'string', format: 'date-time' },
            devolvido: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts'], // Apenas as rotas para documentação
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Biblioteca API - Documentation'
  }))
}