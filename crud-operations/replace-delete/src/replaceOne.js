/**
 * Exemplo de uso do método replaceOne()
 * 
 * O método replaceOne() substitui um único documento correspondente ao filtro.
 * Ele aceita um documento de filtro, o documento de substituição e opções opcionais.
 */
db.books.replaceOne(
  {
    _id: ObjectId("6282afeb441a74a98dbbec4e"),
  },
  {
    title: "Data Science Fundamentals for Python and MongoDB",
    isbn: "1484235967",
    publishedDate: new Date("2018-5-10"),
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
    authors: ["David Paper"],
    categories: ["Data Science"],
  }
)
