#!/bin/bash

# Import the public key that's used by the package management system
echo "Importando a chave pública do MongoDB..."
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc

# Create a list file for the version of Ubuntu (jammy)
echo "Criando o arquivo de lista de repositórios para o Ubuntu 22.04 (Jammy)..."
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update your local package index
echo "Atualizando a lista local de pacotes (apt update)..."
apt update

# Install mongosh
echo "Instalando o MongoDB Shell (mongosh)..."
apt install -y mongodb-mongosh

# Ensure that mongosh was installed successfully
echo "Verificando a versão instalada:"
mongosh --version
