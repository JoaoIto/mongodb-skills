/**
 * Exemplo de uso do método updateOne() com a opção upsert
 * 
 * A opção upsert cria um novo documento se nenhum documento corresponder
 * aos critérios de filtro definidos.
 */
db.podcasts.updateOne(
  { title: "The Developer Hub" },
  { $set: { topics: ["databases", "MongoDB"] } },
  { upsert: true }
)
