FROM node:20-alpine

WORKDIR /app

# Copiar as dependências para instalar
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o restante do código
COPY . .

# Expor a porta do app
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["yarn", "run", "start"]
