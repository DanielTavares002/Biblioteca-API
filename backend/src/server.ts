import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { setupSwagger } from './docs/swagger'
import livroRoutes from './routes/livroRoutes'
import usuarioRoutes from './routes/usuarioRoutes'
import emprestimoRoutes from './routes/emprestimoRoutes'
import authRoutes from './routes/authRoutes'
import dashboardRoutes from './routes/dashboardRoutes'

const app = express()
const PORT = parseInt(process.env.PORT || '3000')

// Configuração CORS
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}

// Middlewares
app.use(helmet())
app.use(cors(corsOptions))
app.use(express.json())

// Swagger Documentation
setupSwagger(app)

// Rotas
app.use('/auth', authRoutes)
app.use('/livros', livroRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/emprestimos', emprestimoRoutes)
app.use('/dashboard', dashboardRoutes)

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: 'Biblioteca API está funcionando!',
    documentation: '/api-docs'
  })
})

// Rota de saúde
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Middleware de erro para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({ 
    message: 'Rota não encontrada',
    availableRoutes: ['/livros', '/usuarios', '/emprestimos', '/api-docs', '/health']
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`)
  console.log(`🌐 Acessível também em: http://0.0.0.0:${PORT}/api-docs`)
})
