const { MongoClient } = require("mongodb");

// A string de conexão do MongoDB Atlas.
// Lembre-se de substituir o trecho "<YOUR_CLUSTER_URL>" pela URL real do seu cluster.
// Usuário: myAtlasDBUser
// Senha: myatlas-001
const uri = "mongodb+srv://myAtlasDBUser:myatlas-001@<YOUR_CLUSTER_URL>/?retryWrites=true&w=majority";

// Criando um novo MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Conecta o cliente ao servidor
    await client.connect();

    console.log("Conectado com sucesso ao MongoDB Atlas!");

    // Seleciona um banco de dados
    const database = client.db("sample_mflix"); // Pode usar um database de testes como sample_mflix
    const collection = database.collection("movies");

    // Exemplo: Buscar o documento de um filme chamado 'The Room'
    const query = { title: "The Room" };
    const movie = await collection.findOne(query);

    if (movie) {
      console.log("Filme encontrado:");
      console.log(movie);
    } else {
      console.log("Nenhum filme encontrado com esse título ou a base não possui sample data ainda.");
    }
  } catch (err) {
    console.error("Erro na conexão com o MongoDB Atlas:");
    console.error(err);
  } finally {
    // Garante que a conexão será encerrada
    await client.close();
  }
}

// Executa a função
run().catch(console.dir);
