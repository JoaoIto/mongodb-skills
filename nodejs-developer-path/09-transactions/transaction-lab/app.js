const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbName = "bank";
const collName = "accounts";

const main = async () => {
  let session;
  try {
    await client.connect();
    console.log("Conectado ao banco de dados com sucesso 🌍");
    
    // Inicia a sessão usando o client Node.js
    session = client.startSession();
    const accounts = client.db(dbName).collection(collName);

    // Inicia a transação ACID
    session.startTransaction();
    console.log("Transação Iniciada! (Tudo ou Nada)");

    // 1. Insere uma nova conta savings (poupança) para a cliente
    const insertResult = await accounts.insertOne(
      {
        account_id: "MDB361428849",
        account_holder: "Donna Wood",
        account_type: "savings",
        balance: 200.0,
        transfers_complete: [],
        last_updated: new Date()
      },
      { session } // Importante: Passando o objeto session para vincular à transação
    );
    console.log(`Documento inserido na conta Savings com ID: ${insertResult.insertedId}`);

    // 2. Subtrai $200 da conta checking (corrente) da cliente
    const updateResult = await accounts.updateOne(
      { account_id: "MDB919841472" },
      { $inc: { balance: -200.00 } },
      { session } // Importante: Passando o objeto session para vincular à transação
    );
    console.log(`Conta Checking Debitada. Documentos modificados: ${updateResult.modifiedCount}`);

    // Efetiva a transação atomicamente
    await session.commitTransaction();
    console.log("Transação (Commit) efetuada com sucesso! ✅");

  } catch (err) {
    console.error(`Ocorreu um erro no pipeline da transação! Abortando as mudanças... Erro: ${err}`);
    if (session) {
      // Reverte o banco para o estado original
      await session.abortTransaction();
      console.log("Transação Cancelada (Abort) ❌");
    }
  } finally {
    if (session) {
      // Sempre encerre a sessão após finalizar as transações
      await session.endSession();
    }
    await client.close();
  }
};

main();
