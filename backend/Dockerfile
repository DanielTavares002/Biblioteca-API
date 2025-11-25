FROM node:18-alpine

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar o resto do código
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 10000

# Comando para rodar
CMD ["npm", "start"]