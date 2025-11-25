"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_1 = require("./docs/swagger");
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const emprestimoRoutes_1 = __importDefault(require("./routes/emprestimoRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
// Configuração CORS
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const corsOptions = {
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
};
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Swagger Documentation
(0, swagger_1.setupSwagger)(app);
// Rotas
app.use('/auth', authRoutes_1.default);
app.use('/livros', livroRoutes_1.default);
app.use('/usuarios', usuarioRoutes_1.default);
app.use('/emprestimos', emprestimoRoutes_1.default);
// Rota padrão
app.get('/', (req, res) => {
    res.json({
        message: 'Biblioteca API está funcionando!',
        documentation: '/api-docs'
    });
});
// Rota de saúde
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Middleware de erro para rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada',
        availableRoutes: ['/livros', '/usuarios', '/emprestimos', '/api-docs', '/health']
    });
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
    console.log(`🌐 Acessível também em: http://0.0.0.0:${PORT}/api-docs`);
});
//# sourceMappingURL=server.js.map