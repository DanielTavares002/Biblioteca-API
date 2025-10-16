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
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3000');
const HOST = '0.0.0.0';
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Swagger Documentation
(0, swagger_1.setupSwagger)(app);
// Routes
app.use('/api/livros', livroRoutes_1.default);
app.use('/api/usuarios', usuarioRoutes_1.default);
app.use('/api/emprestimos', emprestimoRoutes_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'API está funcionando!' });
});
// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});
// Servidor corrigido
app.listen(PORT, HOST, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
    console.log(`🌐 Acessível também em: http://${HOST}:${PORT}/api-docs`);
});
exports.default = app;
//# sourceMappingURL=server.js.map