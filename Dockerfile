FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY backend/package*.json ./
COPY backend/prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar o resto do código
COPY . .

# Compilar TypeScript
RUN npx tsc

# Expor porta
EXPOSE 10000

# Comando para rodar
CMD ["npm", "start"]