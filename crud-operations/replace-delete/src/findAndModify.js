/**
 * Exemplo de uso do método findAndModify()
 * 
 * O método findAndModify() é usado para encontrar e substituir (ou atualizar) 
 * um único documento. O parâmetro `new: true` faz com que o comando retorne 
 * o documento já atualizado.
 */
db.podcasts.findAndModify({
  query: { _id: ObjectId("6261a92dfee1ff300dc80bf1") },
  update: { $inc: { subscribers: 1 } },
  new: true,
})
