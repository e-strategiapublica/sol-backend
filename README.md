# SOL - Sistema Online de Licitação API

Backend do SOL: Sistema Online de Licitação.

---

## Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![YARN](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)](https://yarnpkg.com/cli/install)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/install/#install-compose)

- **Node.js** v14+
- **Yarn** para gerenciamento de dependências
- **Docker** e **Docker Compose** para ambiente containerizado

---

## Gerenciamento de Dependências

Este projeto utiliza **Yarn**. Para instalar as dependências, execute:

```bash
yarn
```

---

## Build do Projeto

### Build Local

Para construir o projeto localmente:

```bash
yarn build
```

### Build com Docker

Para construir a imagem Docker do projeto:

```bash
docker build -t sol-api .
```

---

## Configuração do Ambiente

1. **Copie o arquivo de template `.env`:**

```bash
cp template.env .env
```

2. **Preencha as variáveis de ambiente** no arquivo `.env` conforme o exemplo:

```env
PORT=4002
NOSQL_CONNECTION_STRING=mongodb://localhost:20000/your_whoami_root
JWT_KEY=secret_KEY(exemplo)
JWT_REFRESH_TOKEN_KEY=****************==
JWT_ACCESS_TOKEN_EXPIRATION=8h
JWT_REFRESH_TOKEN_EXPIRATION=7d
ENCRYPT_KEY=********-****-****-****-************
SENDGRID_EMAIL_SENDER=email@email.com
SENDGRID_API_KEY=**.****-****-*******.********-****
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
S3_BUCKET=your_bucket_name
S3_BUCKET_DOCUMENTS=your_documents_bucket
S3_BUCKET_ANNOUNCEMENT_PHOTO=your_announcement_photo_bucket
```

> **Nota:** O arquivo `.env` é a fonte única de verdade para as variáveis de ambiente, sendo utilizado pelo Docker Compose e herdado pelos containers.

---

## Executando o Projeto

### Com Docker Compose

1. **Suba os containers:**

```bash
docker-compose up -d
```

> Antes de rodar o Docker Compose, configure o arquivo `compose.yml` conforme as necessidades do projeto (senha do banco, nomes das bases, etc).

### Localmente

- **Modo desenvolvimento:**

```bash
npm run start:dev
```

- **Modo produção:**

```bash
npm run start:prod
```

---

## Rodando Seeds

Para popular o banco com dados iniciais (seeds), execute:

```bash
npm run seed
```

---

## Testes

- **Testes de ponta a ponta (e2e):**

```bash
npm run test:e2e
```

- **Testes de ponta a ponta com watch:**

```bash
npm run test:e2e:watch
```

- **Cobertura de testes:**

```bash
npm run test:e2e:cov
```

---

## Documentação da API

Após iniciar a API, acesse a documentação interativa via Swagger em:

[http://localhost:4002/docs](http://localhost:4002/docs)

> O link pode variar conforme a porta definida no arquivo `.env`.

---

## Contato

Para dúvidas ou suporte, entre em contato com a equipe de desenvolvimento.

---

**Licença:** Este projeto está licenciado sob os termos da licença AGPL-3.0.

