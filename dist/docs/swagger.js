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
                url: 'https://3000-firebase-bibilioteca-api-1760553480549.cluster-thle3dudhffpwss7zs5hxaeu2o.cloudworkstations.dev',
                description: 'Servidor Cloud Workstations',
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
        components: {
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
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts'],
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