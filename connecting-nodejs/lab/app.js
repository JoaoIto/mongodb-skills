const { MongoClient } = require("mongodb");

// TODO: Substitua pelas suas credenciais e endereço do cluster
const uri = "mongodb+srv://<user>:<password>@<cluster>";

// Instancia um novo MongoClient
const client = new MongoClient(uri);

// Função assíncrona que executa o comando admin de listar bancos de dados
const listDatabases = async (client) => {
  databasesList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
};

// Função principal de execução e tratamento de erros
const main = async () => {
  try {
    // 1. Conecta ao cluster
    await client.connect();
    
    // 2. Chama a função de listagem
    await listDatabases(client);
    
    // 3. Fecha a conexão
    await client.close();
  } catch (e) {
    console.error(e);
  }
};

// Invoca a execução do script
main();
