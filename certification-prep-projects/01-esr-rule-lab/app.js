const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbName = "sample_training";
const collName = "zips";

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados com sucesso 🌍");
    
    const collection = client.db(dbName).collection(collName);

    // Na prova, um cenário clássico é: Filtre pelo state "NY", pegue populações maiores que 10000 e ordene pela cidade.
    // Consulta:
    const query = { state: "NY", pop: { $gt: 10000 } };
    const sort = { city: 1 };

    console.log("---");
    console.log("Executando .explain('executionStats') na Query abaixo:");
    console.log("Equality: state | Range: pop | Sort: city");
    console.log("---\n");

    // O método de execução com explain
    const cursor = collection.find(query).sort(sort);
    const explainPlan = await cursor.explain("executionStats");

    // Extraindo as métricas principais que são cobradas no exame
    const executionStats = explainPlan.executionStats;
    console.log("📊 RESULTADOS DO EXPLAIN (STATISTICS):");
    console.log(`Documentos Retornados (nReturned): ${executionStats.nReturned}`);
    console.log(`Documentos Examinados (totalDocsExamined): ${executionStats.totalDocsExamined}`);
    console.log(`Chaves de Índice Examinadas (totalKeysExamined): ${executionStats.totalKeysExamined}`);
    console.log(`Tempo de Execução (executionTimeMillis): ${executionStats.executionTimeMillis}ms`);
    
    console.log("\n🕵️ DIAGNÓSTICO PARA A PROVA:");
    if (executionStats.totalKeysExamined > executionStats.nReturned) {
      console.log("❌ O índice não é eficiente. Muitas chaves foram lidas à toa (O Range possivelmente quebrou o Sort).");
    } else if (executionStats.totalKeysExamined === 0) {
      console.log("❌ COLLSCAN! Nenhum índice foi usado.");
    } else {
      console.log("✅ Índice super otimizado de acordo com a Regra ESR (Equality, Sort, Range)!");
    }

    // Para ver se teve in-memory sort
    const hasInMemorySort = JSON.stringify(explainPlan.queryPlanner).includes("SORT");
    if (hasInMemorySort) {
      console.log("⚠️ AVISO CRÍTICO: A query usou 'Blocking Sort' (Sort em Memória). Falhou na regra do SORT.");
    }

    console.log("\nNota: Para testar na prática, crie os dois índices abaixo no Atlas ou Mongosh e rode o script alternando-os:");
    console.log("Índice Ruim (ERS): db.zips.createIndex({ state: 1, pop: 1, city: 1 })");
    console.log("Índice Bom  (ESR): db.zips.createIndex({ state: 1, city: 1, pop: 1 })");

  } catch (err) {
    console.error(`Ocorreu um erro: ${err}`);
  } finally {
    await client.close();
  }
};

main();
