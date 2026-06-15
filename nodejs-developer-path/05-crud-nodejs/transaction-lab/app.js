const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Collections
const dbname = "bank";
const accounts_col = "accounts";
const transfers_col = "transfers";

// Account information
let account_id_sender = "MDB574189300";
let account_id_receiver = "MDB343652528";
let transaction_amount = 100;

const main = async () => {
  let session;
  try {
    await client.connect();
    console.log("Conectado com sucesso ao servidor");
    
    const accounts = client.db(dbname).collection(accounts_col);
    const transfers = client.db(dbname).collection(transfers_col);

    console.log("Iniciando a sessão da transação...");

    // Start a new session
    session = client.startSession();

    // Begin a transaction with the withTransaction() method on the session
    const transactionResults = await session.withTransaction(async () => {
      
      console.log("Atualizando saldo do rementente...");
      const senderUpdate = await accounts.updateOne(
        { account_id: account_id_sender },
        { $inc: { balance: -transaction_amount } },
        { session }
      );

      console.log("Atualizando saldo do destinatário...");
      const receiverUpdate = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $inc: { balance: transaction_amount } },
        { session }
      );

      console.log("Criando documento de transferência...");
      const transfer = {
        transfer_id: "TR21872187",
        amount: transaction_amount,
        from_account: account_id_sender,
        to_account: account_id_receiver,
      };

      const insertTransferResults = await transfers.insertOne(transfer, { session });

      console.log("Atualizando array de transferências...");
      const updateSenderTransferResults = await accounts.updateOne(
        { account_id: account_id_sender },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );

      const updateReceiverTransferResults = await accounts.updateOne(
        { account_id: account_id_receiver },
        { $push: { transfers_complete: transfer.transfer_id } },
        { session }
      );
    });

    if (transactionResults) {
      console.log("\nTransação completada com sucesso. Todas as operações foram comitadas.");
    } else {
      console.log("\nA transação falhou.");
    }

  } catch (err) {
    console.error(`\nTransação abortada devido a um erro: ${err}`);
  } finally {
    if (session) {
      await session.endSession();
    }
    await client.close();
  }
};

main();
