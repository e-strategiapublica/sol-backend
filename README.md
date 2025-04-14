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

## Documentação

After starting the server at a port `PORT`, access the generated Swagger documentation at <http://localhost:PORT/docs>.
