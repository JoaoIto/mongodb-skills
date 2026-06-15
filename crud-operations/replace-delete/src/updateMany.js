/**
 * Exemplo de uso do método updateMany()
 * 
 * O método updateMany() atualiza todos os documentos que correspondem
 * ao filtro fornecido.
 */
db.books.updateMany(
  { publishedDate: { $lt: new Date("2019-01-01") } },
  { $set: { status: "LEGACY" } }
)
