// 1. Declarando a função no escopo global do mongosh
const randomMovie = () =>
  db.movies.aggregate([{ $sample: { size: 1 } }]).toArray();

// 2. Invocando a função logo após declarada
randomMovie();
