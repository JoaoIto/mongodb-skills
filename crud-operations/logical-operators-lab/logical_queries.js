// ==========================================
// OPERADORES LÓGICOS EM BUSCAS NO MONGODB
// ==========================================

// 1. $and Implícito (Múltiplas chaves diferentes separadas por vírgula no mesmo objeto)
db.routes.find({ 
  "airline.name": "Southwest Airlines", 
  stops: { $gte: 1 } 
});

// 2. Operador $or (Recebe um Array de possíveis condições em objetos separados)
db.routes.find({
  $or: [
    { dst_airport: "SEA" }, 
    { src_airport: "SEA" }
  ]
});

// 3. Operador $and Explícito (Utilizado para unir e interseccionar múltiplos blocos lógicos como $or's)
db.routes.find({
  $and: [
    { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
    { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] }
  ]
});
