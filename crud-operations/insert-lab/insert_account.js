// Certifique-se de estar usando o banco de dados adequado antes
// use("sample_analytics");

// 1. Comando de Inserção da Conta
db.accounts.insertOne({
  "account_id": 111333,
  "limit": 12000,
  "products": [
    "Commodity",
    "Brokerage"
  ],
  "last_updated": new Date()
});

// 2. Comando de Busca/Validação pela conta inserida
db.accounts.findOne({ account_id: 111333 });
