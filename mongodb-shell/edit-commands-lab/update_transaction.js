// Este é o código que foi colado e editado de dentro do `nano` (via comando `edit`)
// para concluir o laboratório. 

db.transactions.updateOne(
  { account_id: 443178 }, // O valor que precisava ser atualizado de 000000 para 443178
  {
    $push: {
      transactions: {
        date: new Date(),
        amount: Math.floor(Math.random() * 1000),
        transaction_code: Math.random() < 0.5 ? "buy" : "sell",
        symbol: "test",
        price: "100.00",
        total: "1337.10",
      },
    },
  }
);
