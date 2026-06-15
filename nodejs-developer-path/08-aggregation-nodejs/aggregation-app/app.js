const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbname = "bank";
const collection_name = "accounts";

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados com sucesso 🌍");
    const accountsCollection = client.db(dbname).collection(collection_name);

    console.log("\n--- Executando Pipeline 1: $match e $group ---");
    // Objetivo: Encontrar contas com saldo menor que 1.000, 
    // agrupá-las pelo account_type e calcular a média e o total.
    const pipeline1 = [
      { $match: { balance: { $lt: 1000 } } },
      {
        $group: {
          _id: "$account_type",
          total_balance: { $sum: "$balance" },
          avg_balance: { $avg: "$balance" },
        },
      },
    ];

    let result1 = accountsCollection.aggregate(pipeline1);
    for await (const doc of result1) {
      console.log(doc);
    }

    console.log("\n--- Executando Pipeline 2: $sort e $project ---");
    // Objetivo: Encontrar contas 'checking' com saldo >= 1500, 
    // ordenar por saldo de forma descendente, projetar campos específicos 
    // e criar um novo campo calculado (gbp_balance convertendo de dólares para libras).
    const pipeline2 = [
      { $match: { account_type: "checking", balance: { $gte: 1500 } } },
      { $sort: { balance: -1 } },
      {
        $project: {
          _id: 0,
          account_id: 1,
          account_type: 1,
          balance: 1,
          gbp_balance: { $divide: ["$balance", 1.3] },
        },
      },
    ];

    let result2 = accountsCollection.aggregate(pipeline2);
    for await (const doc of result2) {
      console.log(doc);
    }

  } catch (err) {
    console.error(`Erro ao processar as agregações: ${err}`);
  } finally {
    await client.close();
  }
};

main();
