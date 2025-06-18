# SOL - Sistema online de licitação API

Backend do SOL: Solução Online de Licitação.

## Requisitos

[![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)]((https://nodejs.org/en//))
[![YARN](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)](https://yarnpkg.com/cli/install)
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

## Running

Create a `.env` file by copying the template

```
cp template.env .env
```

then filling-in the values in `.env`.

This file is the single source of truth for environment variables. It is read by `docker compose` (by default), and is then inherited by the containers. That is: the database, which reads some of its values by default and in its init scripts, but also the Nest modules.

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

# Disclaimer

Durante a varredura automatizada de segurança com ferramentas como GitGuardian e CodeQL, foram identificados alertas relacionados à presença de secrets (como chaves de API ou credenciais) no código.

Após análise, esclarecemos que nenhum segredo ativo está presente no repositório. Todos os apontamentos referem-se a chaves expiradas ou revogadas, não mais utilizadas no projeto, ou exemplos de configuração ou placeholders genéricos, como chaves de bibliotecas públicas (ex: AWS, Firebase), utilizadas apenas em testes ou documentação.

Não há necessidade de reescrever o histórico do Git, uma vez que os dados referenciados não representam risco de segurança atual, já que não estão vinculados a ambientes de produção.

Melhorias contínuas estão sendo adotadas, como:

- Utilização exclusiva de variáveis de ambiente em ambientes sensíveis.
- Monitoramento contínuo com ferramentas de análise estática.
- Adoção de boas práticas de versionamento seguro.

Nos comprometemos a manter os mais altos padrões de segurança no desenvolvimento, garantindo que nenhum segredo sensível esteja acessível em nossos repositórios públicos ou privados.
