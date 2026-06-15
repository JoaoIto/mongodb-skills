#!/bin/bash

# Este script executa a conexão com o MongoDB Atlas usando o mongosh
# Ele já embute a string de conexão do cluster e o nome de usuário.

echo "Iniciando a conexão com o cluster do Atlas via mongosh..."
echo "Aviso: Logo após executar este comando, ele pedirá sua senha (myatlas-001)."

mongosh "mongodb+srv://myatlasclusteredu.rzk9irm.mongodb.net/" --apiVersion 1 --username myAtlasDBUser

# NOTA: Comandos interativos do shell do MongoDB como `show dbs` ou `exit`
# devem ser digitados manualmente pelo usuário logo após o prompt do Atlas aparecer.
