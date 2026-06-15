const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const dbName = "sample_mflix";
const collName = "movies";

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado ao banco de dados com sucesso 🌍");
    
    const collection = client.db(dbName).collection(collName);

    console.log("---");
    console.log("Atenção: Para este script funcionar perfeitamente, você já deve ter criado o Atlas Search Index chamado 'plotIndex'.");
    console.log("---\n");

    // 1. O pipeline de Full-Text Search ($search) com limite e pontuação de score ($meta)
    const searchPipeline = [
      {
        $search: {
          index: "plotIndex", // O nome do índice que você criou no Atlas
          text: {
            query: "space",
            path: "plot"
          }
        }
      },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          title: 1,
          plot: 1,
          score: { $meta: "searchScore" }
        }
      }
    ];

    console.log("1. Executando a query de Busca ($search) sobre o termo 'space'...");
    const searchResults = await collection.aggregate(searchPipeline).toArray();
    console.log(searchResults);

    console.log("\n------------------------------------------------------\n");

    // 2. Retornando apenas os Metadados da Busca ($searchMeta) - Contagem Total
    const searchMetaPipeline = [
      {
        $searchMeta: {
          index: "plotIndex",
          text: {
            query: "space",
            path: "plot"
          },
          count: {
            type: "total"
          }
        }
      }
    ];

    console.log("2. Executando a captura de Metadados ($searchMeta) para obter a contagem total...");
    const metaResults = await collection.aggregate(searchMetaPipeline).toArray();
    console.log(metaResults);

    console.log("\n------------------------------------------------------\n");

    // 3. O operador 'equals' (buscando um Date exato) usando plotReleasedIndex
    const equalsPipeline = [
      {
        $search: {
          index: "plotReleasedIndex",
          equals: {
            path: "released",
            value: new Date("1999-03-31T00:00:00.000Z")
          }
        }
      },
      { $limit: 2 },
      { $project: { _id: 0, title: 1, released: 1 } }
    ];

    console.log("3. Executando Busca Exata ($search - equals) pela data de lançamento 1999-03-31...");
    const equalsResults = await collection.aggregate(equalsPipeline).toArray();
    console.log(equalsResults);

    console.log("\n------------------------------------------------------\n");

    // 4. O operador 'near' (buscando por proximidade com score decay)
    const nearPipeline = [
      {
        $search: {
          index: "plotReleasedIndex",
          near: {
            path: "released",
            origin: new Date("1999-05-17T00:00:00.000Z"),
            pivot: 2629746000 // Aprox 1 mês em milissegundos
          }
        }
      },
      { $limit: 3 },
      { $project: { _id: 0, title: 1, released: 1, score: { $meta: "searchScore" } } }
    ];

    console.log("4. Executando Busca por Proximidade ($search - near) perto de 1999-05-17...");
    const nearResults = await collection.aggregate(nearPipeline).toArray();
    console.log(nearResults);

    console.log("\n------------------------------------------------------\n");

    // 5. O operador 'range' (buscando por intervalos)
    const rangePipeline = [
      {
        $search: {
          index: "plotReleasedIndex",
          range: {
            path: "released",
            gt: new Date("1994-01-01T00:00:00.000Z"),
            lt: new Date("1999-01-01T00:00:00.000Z")
          }
        }
      },
      { $limit: 3 },
      { $project: { _id: 0, title: 1, released: 1 } }
    ];

    console.log("5. Executando Busca por Intervalo ($search - range) entre 1994 e 1999...");
    const rangeResults = await collection.aggregate(rangePipeline).toArray();
    console.log(rangeResults);

    console.log("\n------------------------------------------------------\n");

    // 6. Criando Facetas usando genresFacetedIndex
    const facetPipeline = [
      {
        $searchMeta: {
          index: "genresFacetedIndex",
          facet: {
            operator: { // O filtro primário
              range: {
                path: "released",
                gte: new Date("2000-01-01T00:00:00.000Z"),
                lte: new Date("2000-01-31T00:00:00.000Z")
              }
            },
            facets: { // A quebra por buckets do resultado
              genresFacet: {
                type: "string",
                path: "genres",
                numBuckets: 3 // Pegando apenas os 3 gêneros mais presentes naquele mês
              }
            }
          }
        }
      }
    ];

    console.log("6. Categorizando resultados em Buckets (Facetas - $searchMeta)...");
    const facetResults = await collection.aggregate(facetPipeline).toArray();
    console.log(JSON.stringify(facetResults, null, 2));

  } catch (err) {
    console.error(`Ocorreu um erro. Verifique sua string de conexão ou se o índice foi criado corretamente no Atlas: ${err}`);
  } finally {
    await client.close();
  }
};

main();
