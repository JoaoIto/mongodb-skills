const { MongoClient } = require("mongodb");

// TODO: Substitua pela sua URI de conexão real do MongoDB Atlas
const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

// Definição das constantes para o banco e coleção
const dbname = "bank";
const collection_name = "accounts";

const sampleAccount = {
  account_holder: "Linus Torvalds",
  account_id: "MDB829001337",
  account_type: "checking",
  balance: 50352434,
};

const sampleAccounts = [
  {
    account_id: "MDB011235813",
    account_holder: "Ada Lovelace",
    account_type: "checking",
    balance: 60218,
  },
  {
    account_id: "MDB829000001",
    account_holder: "Muhammad ibn Musa al-Khwarizmi",
    account_type: "savings",
    balance: 267914296,
  },
];

const main = async () => {
  try {
    // 1. Conecta ao cluster
    await client.connect();
    console.log("Conectado com sucesso ao servidor");

    // 2. Referência para a coleção "accounts"
    const accountsCollection = client.db(dbname).collection(collection_name);

    // 3. Exemplo de insertOne
    console.log("\nInserindo uma única conta...");
    let resultOne = await accountsCollection.insertOne(sampleAccount);
    console.log(`Documento inserido com o ID: ${resultOne.insertedId}`);

    // 4. Exemplo de insertMany
    console.log("\nInserindo múltiplas contas...");
    let resultMany = await accountsCollection.insertMany(sampleAccounts);
    console.log(`Inserido ${resultMany.insertedCount} documentos`);
    console.log(resultMany);

  } catch (err) {
    console.error(`Erro durante as operações de banco de dados: ${err}`);
  } finally {
    // 5. Fecha a conexão
    await client.close();
  }
};

main();
