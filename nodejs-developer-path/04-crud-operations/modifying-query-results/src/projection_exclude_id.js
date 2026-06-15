/**
 * Projeções - Suprimir explicitamente o _id
 * 
 * Retorna todas as inspeções de restaurantes incluindo apenas os campos 
 * business_name e result. Omitimos (suprimimos) o campo _id com o valor 0.
 */
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1, _id: 0 }
)
