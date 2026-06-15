// 1. Busca documentos que contêm um valor específico diretamente numa lista (Array primitivo)
db.accounts.find({ products: "InvestmentFund" });

// 2. Busca subdocumentos dentro de arrays complexos utilizando $elemMatch (com múltiplos operadores matemáticos juntos)
db.sales.find({
  items: {
    $elemMatch: { 
      name: "laptop", 
      price: { $gt: 800 }, 
      quantity: { $gte: 1 } 
    }
  }
});
