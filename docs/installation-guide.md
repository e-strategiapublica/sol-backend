# Guia de Instalação do Backend SOL

Este guia detalha o passo a passo para instalar o backend SOL em um servidor de produção.

## 1. Requisitos do Servidor

- Acesso SSH ao servidor
- Python 3.x instalado
- Nginx
- Node.js 22.13.1 (via NVM)
- PM2 (Gerenciador de processos Node.js)
- Yarn
- Docker e Docker Compose

## 2. Preparação do Ambiente

### 2.1. Instalação do Docker

```bash
# Atualizar pacotes
sudo apt update

# Instalar dependências necessárias
sudo apt install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Adicionar chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório do Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Instalar Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Adicionar seu usuário ao grupo docker
sudo usermod -aG docker $USER

# Ativar o serviço do Docker
sudo systemctl enable docker
sudo systemctl start docker
```

### 2.2. Instalação do Docker Compose

```bash
# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Dar permissão de execução
sudo chmod +x /usr/local/bin/docker-compose

# Verificar a instalação
docker-compose --version
```

### 2.3. Instalação do NVM e Node.js

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Recarregar as configurações do shell
source ~/.bashrc

# Instalar a versão específica do Node.js
nvm install 22.13.1
nvm use 22.13.1

# Instalar Yarn globalmente
npm install -g yarn
```

### 2.4. Instalação do PM2

```bash
yarn global add pm2
```

### 2.5. Instalação do Python (se não estiver instalado)

```bash
sudo apt update
sudo apt install python3 python3-pip
```

### 2.6. Instalação e Configuração do Nginx

```bash
# Instalar Nginx
sudo apt install nginx

# Configurar limite de upload
sudo nano /etc/nginx/nginx.conf

# Adicionar/modificar dentro do bloco http {}
client_max_body_size 50M;
```

#### Configuração do Domínio

```bash
# Criar arquivo de configuração para o domínio
sudo nano /etc/nginx/sites-available/sol-backend

# Adicionar a configuração abaixo
server {
    listen 80;
    server_name seu-dominio.com;  # Substitua pelo seu domínio

    location / {
        proxy_pass http://localhost:3000;  # Porta da aplicação
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

# Criar link simbólico para habilitar o site
sudo ln -s /etc/nginx/sites-available/sol-backend /etc/nginx/sites-enabled/

# Testar configuração do Nginx
sudo nginx -t

# Reiniciar Nginx
sudo systemctl restart nginx
```

## 3. Deploy da Aplicação

### 3.1. Build da Aplicação

No ambiente de desenvolvimento:

```bash
# Gerar build
yarn build

# Comprimir arquivos necessários
tar -czf dist.tar.gz dist/ package.json yarn.lock ecosystem.config.js .nvmrc template.env compose.yml
```

### 3.2. Envio para o Servidor

```bash
# Enviar arquivos para o servidor (execute no seu computador local)
scp dist.tar.gz usuario@servidor:/caminho/da/aplicacao/
```

### 3.3. Configuração no Servidor

```bash
# No servidor
cd /caminho/da/aplicacao
tar -xzf dist.tar.gz
yarn install --production
```

## 4. Configuração do Ambiente

### 4.1. Configuração do .env

Copie o template.env para .env e configure as variáveis necessárias:

```bash
cp template.env .env
nano .env
```

Variáveis que precisam ser configuradas:

```env
NODE_ENV=production
DB_DIR=
MONGO_PASSWORD=
PORT=3000
NOSQL_CONNECTION_STRING=
DATABASE=
JWT_KEY=
JWT_REFRESH_TOKEN_KEY=
ENCRYPT_KEY=
SENDGRID_EMAIL_SENDER=
SENDGRID_API_KEY=
AWS_REGION=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
BUCKET=
BLOCKCHAIN_ACTIVE=true
PROJECT_ID=
PROVIDER=
REGISTRY_CONTRACT_ADDRESS=
OWNER_ADDRESS=
ADMIN_PRIVATE_KEY=
```

### 4.2. Iniciar o Banco de Dados

```bash
# Iniciar os containers do banco de dados em segundo plano
docker-compose up -d

# Verificar se os containers estão rodando
docker ps

# Verificar logs dos containers (se necessário)
docker-compose logs -f
```

## 5. Inicialização da Aplicação

### 5.1. Iniciar com PM2

```bash
# Iniciar a aplicação
pm2 start ecosystem.config.js

# Configurar para iniciar automaticamente após reboot
pm2 startup
pm2 save
```

## 6. Verificação da Instalação

### 6.1. Verificar Status

```bash
# Verificar status do PM2
pm2 status

# Verificar logs
pm2 logs sol-backend

# Verificar status dos containers Docker
docker ps
docker-compose ps
```

### 6.2. Teste de Saúde

```bash
# Testar endpoint de health check
curl http://localhost:3000/health-check

# Testar endpoint de health check usando o domínio
curl http://seu-dominio.com/health-check
```

## 7. Solução de Problemas

Se encontrar problemas:

1. Verifique os logs do PM2: `pm2 logs sol-backend`
2. Verifique as configurações do .env
3. Confirme se todas as variáveis de ambiente estão corretas
4. Verifique os logs do Nginx: `sudo tail -f /var/log/nginx/error.log`
5. Verifique se o domínio está apontando corretamente: `dig seu-dominio.com`
6. Verifique os logs dos containers: `docker-compose logs`
7. Verifique o status dos containers: `docker ps`

## 8. Manutenção

Para atualizar a aplicação:

```bash
# Parar a aplicação
pm2 stop sol-backend

# Atualizar arquivos
# ... (processo de deploy)

# Reiniciar bancos de dados (se necessário)
docker-compose down
docker-compose up -d

# Reiniciar a aplicação
pm2 restart sol-backend
```

### 8.1. Comandos Úteis do Docker

```bash
# Parar todos os containers
docker-compose down

# Remover volumes (cuidado - isso apaga os dados)
docker-compose down -v

# Reiniciar containers
docker-compose restart

# Ver logs em tempo real
docker-compose logs -f

# Ver uso de recursos
docker stats
```
