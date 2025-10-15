import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { swaggerSpec } from './docs/swagger';
import livroRoutes from './routes/livroRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import emprestimoRoutes from './routes/emprestimoRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString(),
  });
});

// Rotas
app.use('/api/livros', livroRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

// Documentação Swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota não encontrada
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
});

// Middleware de erro global
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📚 API de Biblioteca disponível em: http://localhost:${PORT}`);
  console.log(`📖 Documentação disponível em: http://localhost:${PORT}/api/docs`);
});

export default app;