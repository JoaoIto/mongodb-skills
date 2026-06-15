// 1. Cria a variável Array contendo os documentos a serem inseridos
const docsToInsert = [
  {
    account_id: 111789,
    limit: 12000,
    products: ["Commodity", "Brokerage"],
    last_updated: new Date(),
  },
  {
    account_id: 678943,
    limit: 8000,
    products: ["CurrencyService", "Brokerage", "InvestmentStock"],
    last_updated: new Date(),
  },
  {
    account_id: 321654,
    limit: 10000,
    products: ["Commodity", "CurrencyService"],
    last_updated: new Date(),
  }
];

// 2. Passa a variável construída para o método insertMany() na coleção accounts
db.accounts.insertMany(docsToInsert);
