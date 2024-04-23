# Use a imagem oficial do Node.js 20
FROM node:18-alpine3.16

# Crie e defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e o yarn.lock para o diretório de trabalho
COPY package.json ./

COPY prisma ./prisma/

# Instale as dependências usando o Yarn
RUN yarn install

COPY . .

# Copie o resto dos arquivos do projeto para o diretório de trabalho

# Exponha a porta do servidor Fastify (opcional, dependendo do uso)
EXPOSE 3000

# Comando padrão para iniciar o servidor Fastify
CMD ["yarn", "run", "migrate:nodemon"]
