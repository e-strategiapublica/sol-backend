#!/bin/sh

echo "Aguardando MongoDB iniciar..."

# Esperar MongoDB ficar acessível
until nc -z -v -w30 mongodb 27017
do
  echo "Aguardando MongoDB..."
  sleep 5
done

echo "MongoDB está acessível!"

# Verifica se o banco já tem usuários cadastrados
USER_COUNT=$(mongosh "mongodb://mongo:27017/sol" --quiet --eval "db.users.countDocuments()")

if [ "$USER_COUNT" -eq 0 ]; then
    if [ -z "$ADMIN_EMAIL" ] || [ -z "$ADMIN_NAME" ]; then
        echo "Erro: Variáveis ADMIN_EMAIL e ADMIN_NAME são obrigatórias para criar usuário admin!" >&2
        exit 1
    fi

    echo "Banco vazio. Criando usuário admin..."
    
    mongosh "mongodb://sol:password@mongodb:27017/test" --quiet --eval "
        db.users.insertOne({
            email: '$ADMIN_EMAIL',
            name: '$ADMIN_NAME',
            password: "password", 
            role: 'admin',
            verified: false
        });
    "

    echo "Usuário admin criado: $ADMIN_EMAIL"
else
    echo "Banco já contém usuários. Nenhuma ação necessária."
fi

# Executa o comando padrão do container
exec "$@"
