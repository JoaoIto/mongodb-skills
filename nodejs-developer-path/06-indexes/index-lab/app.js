const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbname = "shop";
const collection_name = "users";

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado com sucesso ao servidor");
    
    const usersCollection = client.db(dbname).collection(collection_name);

    console.log("1. Criando um índice de campo único (Single Field Index) em 'age'...");
    await usersCollection.createIndex({ age: 1 });

    console.log("2. Criando um índice único (Unique Index) em 'email'...");
    await usersCollection.createIndex({ email: 1 }, { unique: true });

    console.log("3. Criando um índice multikey (Multikey Index) em 'roles' (array)...");
    await usersCollection.createIndex({ roles: 1 });

    console.log("4. Criando um índice composto (Compound Index) (Equality, Sort, Range)...");
    await usersCollection.createIndex({ active: 1, age: -1, name: 1 });

    console.log("\nListando todos os índices da coleção:");
    const indexes = await usersCollection.indexes();
    console.log(indexes);

    console.log("\nInserindo um documento de teste...");
    const sampleUser = {
      name: "Maria Silva",
      email: "maria.silva@example.com",
      age: 28,
      roles: ["admin", "editor", "viewer"],
      active: true
    };
    
    try {
      await usersCollection.insertOne(sampleUser);
      console.log("Documento inserido com sucesso.");
    } catch (error) {
      if (error.code === 11000) {
        console.log("Erro de chave duplicada (E11000) capturado. O e-mail já existe.");
      } else {
        throw error;
      }
    }

    console.log("\n5. Deletando um índice específico (age_1)...");
    await usersCollection.dropIndex("age_1");

    console.log("6. Deletando todos os índices definidos pelo usuário (exceto _id)...");
    await usersCollection.dropIndexes();

  } catch (err) {
    console.error(`Erro: ${err}`);
  } finally {
    await client.close();
  }
};

main();
