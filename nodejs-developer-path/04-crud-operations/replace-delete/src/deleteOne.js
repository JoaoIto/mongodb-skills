/**
 * Exemplo de uso do método deleteOne()
 * 
 * O método deleteOne() deleta o primeiro documento que corresponde
 * ao filtro fornecido.
 */
db.podcasts.deleteOne({ _id: ObjectId("6282c9862acb966e76bbf20a") })
