const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// Para este lab, usaremos o banco e coleção padrão presentes nos Sample Datasets do Atlas
const dbname = "sample_training";
const collection_name = "zips"; 

const main = async () => {
  try {
    await client.connect();
    console.log("Conectado com sucesso ao servidor");
    
    const zipsCollection = client.db(dbname).collection(collection_name);

    // Definindo o pipeline de agregação
    // Objetivo: Filtrar zips do estado de 'NY' e contar o número de Zips agrupados por cidade
    const pipeline = [
      {
        $match: {
          state: "NY"
        }
      },
      {
        $group: {
          _id: "$city",
          totalZips: { $count: {} }
        }
      },
      {
        $sort: {
          totalZips: -1 // Opcional: ordenar as cidades com maior número de Zips no topo
        }
      },
      {
        $limit: 5 // Para não poluir o terminal, limitamos a 5 cidades
      },
      {
        // $set: Cria novos campos ou altera existentes
        $set: {
          estado_formatado: "Nova York (NY)"
        }
      },
      {
        // $project: Define exatamente os campos que queremos na saída
        $project: {
          _id: 0, // Oculta a chave original de agrupamento
          cidade: "$_id", // Renomeia e mapeia
          numero_de_ceps: "$totalZips", // Renomeia o totalZips
          estado_formatado: 1 // Inclui o campo recém-criado no $set
        }
      }
    ];

    console.log("Executando o Aggregation Pipeline 1 (Com $match, $group, $sort, $limit, $set e $project)...");
    
    // O retorno de um aggregate é um cursor
    const resultCursor = zipsCollection.aggregate(pipeline);
    
    // Iteramos sobre o cursor
    for await (const doc of resultCursor) {
      console.log(doc);
    }

    console.log("\nExecutando o Aggregation Pipeline 2 (Demonstrando o ESTÁGIO $count)...");
    // O estágio $count conta o número de documentos que chegaram até ele e retorna 1 único doc
    const countPipeline = [
      { $match: { state: "NY" } },
      { $count: "total_de_ceps_em_ny" }
    ];
    
    const countCursor = zipsCollection.aggregate(countPipeline);
    for await (const doc of countCursor) {
      console.log(doc);
    }

    console.log("\nExecutando o Aggregation Pipeline 3 (Salvando resultados com $out)...");
    // O estágio $out deve ser SEMPRE o último estágio. Ele pega os documentos do pipeline
    // e os escreve em uma nova coleção. Se a coleção existir, será SOBRESCRITA.
    const outPipeline = [
      { $match: { state: "NY" } },
      { $group: { _id: "$city", totalZips: { $count: {} } } },
      { $out: "ny_city_zips_summary" }
    ];
    
    // Quando usamos $out, o aggregate executa, escreve os dados e não retorna os documentos no cursor
    await zipsCollection.aggregate(outPipeline).toArray();
    console.log("Os dados foram salvos com sucesso na coleção 'ny_city_zips_summary'!");

  } catch (err) {
    console.error(`Erro: ${err}`);
  } finally {
    await client.close();
  }
};

main();
