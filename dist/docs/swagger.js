"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
};
const specs = (0, swagger_jsdoc_1.default)(options);
const setupSwagger = (app) => {
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs, {
        explorer: true,
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'Biblioteca API - Documentation'
    }));
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map