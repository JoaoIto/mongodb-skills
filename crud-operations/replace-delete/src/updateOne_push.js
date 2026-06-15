/**
 * Exemplo de uso do método updateOne() com o operador $push
 * 
 * O operador $push adiciona um novo valor a um campo de array.
 */
db.podcasts.updateOne(
  { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
  { $push: { hosts: "Nic Raboy" } }
)
