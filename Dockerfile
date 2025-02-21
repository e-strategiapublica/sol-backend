FROM node:20-alpine

WORKDIR /app

# Copiar os arquivos necessários
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install

# Copiar o restante do código
COPY . .

# Copiar e dar permissão ao script de inicialização
COPY entry.sh /entry.sh
RUN chmod +x /entry.sh

# Definir a porta padrão
EXPOSE 80

# Definir o script de entrada
ENTRYPOINT ["/entry.sh"]

# Iniciar a aplicação
CMD ["yarn", "run", "start"]
