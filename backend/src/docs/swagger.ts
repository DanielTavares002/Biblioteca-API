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
        description: 'Servidor local',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Livro: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            titulo: { type: "string", example: "Dom Casmurro" },
            autor: { type: "string", example: "Machado de Assis" },
            isbn: { type: "string", example: "978-85-7232-144-9" },
            editora: { type: "string", example: "Editora Martin Claret" },
            ano: { type: "integer", example: 1899 },
            disponivel: { type: "boolean", example: true },
            createdAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" }
          }
        },
        Usuario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "João Silva" },
            email: { type: "string", example: "joao@email.com" },
            telefone: { type: "string", example: "(11) 99999-9999" },
            createdAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" }
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
        Secretario: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            nome: { type: "string", example: "Admin" },
            email: { type: "string", example: "admin@biblioteca.com" },
            createdAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" },
            updatedAt: { type: "string", format: "date-time", example: "2024-01-15T10:00:00.000Z" }
          }
        },
        LoginResponse: {
          type: "object", 
          properties: {
            message: { type: "string", example: "Login realizado com sucesso" },
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
            secretario: {
              $ref: '#/components/schemas/Secretario'
            }
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
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
}

const specs = swaggerJsdoc(options)

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Biblioteca API - Documentation'
  }))
}
