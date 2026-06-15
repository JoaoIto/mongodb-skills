/**
 * Exemplo de uso do método deleteMany()
 * 
 * O método deleteMany() deleta todos os documentos que correspondem
 * ao filtro fornecido.
 */
db.podcasts.deleteMany({ category: "crime" })
