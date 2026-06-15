const { MongoClient, ObjectId } = require("mongodb");

// TODO: Substitua pela sua URI de conexão real do MongoDB Atlas
const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const main = async () => {
  try {
    // 1. Conecta ao cluster
    await client.connect();
    console.log("Conectado com sucesso ao servidor");

    const accountsCollection = client.db(dbname).collection(collection_name);

    // 2. Exemplo de deleteOne() - Deletando um documento específico por ObjectId
    console.log("\nDeletando uma conta específica...");
    // Substitua o ObjectId abaixo por um ID que exista na sua coleção
    const documentToDelete = { _id: new ObjectId("62d6e04ecab6d8e13049749c") };
    
    let resultOne = await accountsCollection.deleteOne(documentToDelete);
    resultOne.deletedCount === 1
      ? console.log("Deletado 1 documento com sucesso")
      : console.log("Nenhum documento deletado no deleteOne (talvez o ID não exista)");

    // 3. Exemplo de deleteMany() - Deletando todas as contas com saldo menor que 500
    console.log("\nDeletando múltiplas contas (balance < 500)...");
    const documentsToDelete = { balance: { $lt: 500 } };
    
    let resultMany = await accountsCollection.deleteMany(documentsToDelete);
    resultMany.deletedCount > 0
      ? console.log(`Foram deletados ${resultMany.deletedCount} documentos`)
      : console.log("Nenhum documento deletado no deleteMany");

  } catch (err) {
    console.error(`Erro durante as operações de banco de dados: ${err}`);
  } finally {
    // 4. Fecha a conexão
    await client.close();
  }
};

main();
