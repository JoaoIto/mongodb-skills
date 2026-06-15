/**
 * Exemplo de uso do método updateOne() com o operador $set
 * 
 * O operador $set substitui o valor de um campo pelo valor especificado.
 */
db.podcasts.updateOne(
  {
    _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8"),
  },
  {
    $set: {
      subscribers: 98562,
    },
  }
)
