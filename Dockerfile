FROM node:18-alpine

# Instalar OpenSSL que o Prisma precisa
RUN apk add --no-cache openssl

WORKDIR /app/backend

# Copiar arquivos de dependências
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
COPY backend/tsconfig.json ./

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar o resto do código
COPY backend/src ./src

# Compilar TypeScript
RUN npx tsc

# Expor porta
EXPOSE 10000

# Comando para rodar (aplica migrations, seed e inicia)
CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/scripts/seedDatabase.ts && node dist/server.js"]