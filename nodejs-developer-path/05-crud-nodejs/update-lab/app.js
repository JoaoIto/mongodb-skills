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

    // 2. Exemplo de updateOne() - Adicionando $100 no balance
    console.log("\nAtualizando uma conta específica (por ObjectId)...");
    
    // Substitua a string abaixo por um ObjectId válido da sua base, se necessário
    const documentToUpdate = { _id: new ObjectId("62d6e04ecab6d8e130497482") };
    const updateOneInstruction = { $inc: { balance: 100 } };
    
    let resultOne = await accountsCollection.updateOne(documentToUpdate, updateOneInstruction);
    resultOne.modifiedCount === 1
      ? console.log("Atualizado com sucesso (1 documento)")
      : console.log("Nenhum documento modificado no updateOne (verifique o ID)");

    // 3. Exemplo de updateMany() - Inserindo uma transferência via $push
    console.log("\nAtualizando múltiplas contas (account_type = checking)...");
    
    const documentsToUpdate = { account_type: "checking" };
    const updateManyInstruction = { $push: { transfers_complete: "TR413308000" } };
    
    let resultMany = await accountsCollection.updateMany(documentsToUpdate, updateManyInstruction);
    resultMany.modifiedCount > 0
      ? console.log(`Foram atualizados ${resultMany.modifiedCount} documentos`)
      : console.log("Nenhum documento modificado no updateMany");

  } catch (err) {
    console.error(`Erro durante as operações de banco de dados: ${err}`);
  } finally {
    // 4. Fecha a conexão
    await client.close();
  }
};

main();
