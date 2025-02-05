<h1 align="center">SOL - Sistema online de licitação API </h1>

## :computer: Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)]((https://nodejs.org/en//))
[![YARN](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)](https://yarnpkg.com/cli/install)
[![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://docs.docker.com/compose/install/#install-compose)

## Dependency management

This project uses `yarn`, so use that for dependency management.

## Building

To simply build the project as it is, run the following:

```bash
yarn install
```

To build the docker image with the project running inside, use:

```sh
docker build .
```

## Rodar seed

Execute o comando:

```bash
$ npm run seed
```

## Preparar o ambiente

**1**. Acesse o diretório raiz da API e execute o comando abaixo:

``` sh
$ docker-compose up -d
```

> Para utilizar o Docker, é necessário abrir o arquivo docker-compose.yml e configurar a senha, nome da base, etc.

**2**. Crie um arquivo `.env` na pasta raiz da API com o seguinte formato:

``` sh
PORT=4002
NOSQL_CONNECTION_STRING=mongodb://localhost:20000/lacchain
JWT_KEY=secret_KEY
JWT_REFRESH_TOKEN_KEY=****************==
JWT_ACCESS_TOKEN_EXPIRATION=8h
JWT_REFRESH_TOKEN_EXPIRATION=7d
ENCRYPT_KEY=********-****-****-****-************
SENDGRID_EMAIL_SENDER=email@email.com
SENDGRID_API_KEY=	**.****-****-*******.********-****

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=******************
AWS_SECRET_ACCESS_KEY=**********/********/****

S3_BUCKET=dev-sol-app-api

S3_BUCKET_DOCUMENTS=dev-sol-app-api

S3_BUCKET_ANNOUNCEMENT_PHOTO=dev-sol-app-api
```

| Descrição | Parâmetro |
| --- | --- |
| PORT | Porta em que a API será iniciada |
| NOSQL_CONNECTION_STRING | String de conexão com a base de dados, aqui deve ser adicionado o caminho publicado pelo docker compose. |
| JWT_KEY | Chave utilizada para a criptografia JWT |
| JWT_REFRESH_TOKEN_KEY | Chave utilizada para verificar a autenticidade dos Tokens de atualização JWT |
| JWT_ACCESS_TOKEN_EXPIRATION | Tempo de expiração do Token JWT |
| JWT_REFRESH_TOKEN_EXPIRATION | Tempo de expiração do Token de atualização JWT |
| ENCRYPT_KEY | Chave utilizada para a criptografia do Payload. Deve ser gerada pelo usuário e o mesmo deve estar de acordo com o frontend. |
| SENDGRID_EMAIL_SENDER | Email de origem para os serviços SendGrid |
| SENDGRID_API_KEY | Chave utilizada para autenticar e autorizar o acesso aos recursos do serviço SendGrid |
| AWS_REGION | Região do servidor AWS (Nulo caso não utilize AWS) |
| AWS_ACCESS_KEY_ID | Chave de acesso da AWS | 
| AWS_SECRET_ACCESS_KEY | Autenticador de acesso para serviços AWS |
| S3_BUCKET | Bucket de armazenamento da AWS (Opcional, podendo utilizar outro bucket) |
| S3_BUCKET_DOCUMENTS | Bucket de armazenamento da AWS (Opcional, podendo utilizar outro bucket) | 
| S3_BUCKET_ANNOUNCEMENT_PHOTO | Bucket de armazenamento da AWS (Opcional, podendo utilizar outro bucket) |

## Executando a API

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Documentação

Após executar a api acesse http://localhost:4002/docs

> O Link pode mudar de acordo com a porta utilizada.

## Testes

```bash

# end to end tests
$ npm run test:e2e

# end to end test watch
$ npm run test:e2e:watch

# test coverage
$ npm run test:e2e:cov

```

## Suporte

contact@tgtdigital.com
