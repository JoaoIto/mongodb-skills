const { MongoClient, ObjectId } = require("mongodb");

// TODO: Substitua pela sua URI de conexão real do MongoDB Atlas
const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// Definição das constantes para o banco e coleção
const dbname = "bank";
const collection_name = "accounts";

const main = async () => {
  try {
    // 1. Conecta ao cluster
    await client.connect();
    console.log("Conectado com sucesso ao servidor");

    const accountsCollection = client.db(dbname).collection(collection_name);

    // 2. Exemplo de find() - Múltiplos documentos
    console.log("\nBuscando múltiplas contas (balance > 4700)...");
    const documentsToFind = { balance: { $gt: 4700 } };
    
    let result = accountsCollection.find(documentsToFind);
    let docCount = accountsCollection.countDocuments(documentsToFind);
    
    // Iterando de forma assíncrona pelo cursor de resultados
    await result.forEach((doc) => console.log(doc));
    console.log(`Encontrados ${await docCount} documentos na busca múltipla.`);

    // 3. Exemplo de findOne() - Um único documento
    console.log("\nBuscando uma conta específica (por _id / ObjectId)...");
    
    // Substitua a string abaixo por um ObjectId válido da sua base, se necessário
    const documentToFind = { _id: new ObjectId("62a3638521a9ad028fdf77a3") };
    
    let resultOne = await accountsCollection.findOne(documentToFind);
    console.log(`Documento encontrado:`);
    console.log(resultOne);

  } catch (err) {
    console.error(`Erro durante as operações de banco de dados: ${err}`);
  } finally {
    // 4. Fecha a conexão
    await client.close();
  }
};

main();
