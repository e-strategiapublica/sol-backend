# SOL - Sistema Online de Licitação (backend)

Backend do SOL: Solução Online de Licitação.

## Dependencies

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

## 🔒 Segurança e Criptografia

A criptografia simétrica baseada em `crypto-js` foi removida do backend. Toda comunicação entre sistemas ocorre em texto puro/JSON, protegida exclusivamente por HTTPS.

O uso de `crypto-js` permanece **apenas** para operações de hash SHA256 (ex: geração de IDs), nunca para criptografia de tráfego.

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
