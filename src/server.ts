import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { setupSwagger } from './docs/swagger'
import livroRoutes from './routes/livroRoutes'
import usuarioRoutes from './routes/usuarioRoutes'
import emprestimoRoutes from './routes/emprestimoRoutes'

const app = express()
const PORT = parseInt(process.env.PORT || '3000')
const HOST = '0.0.0.0'

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.json())

// Swagger Documentation
setupSwagger(app)

// Routes
app.use('/api/livros', livroRoutes)
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/emprestimos', emprestimoRoutes)

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API está funcionando!' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' })
})

// Servidor corrigido
app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`)
  console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`)
  console.log(`🌐 Acessível também em: http://${HOST}:${PORT}/api-docs`)
})

export default app