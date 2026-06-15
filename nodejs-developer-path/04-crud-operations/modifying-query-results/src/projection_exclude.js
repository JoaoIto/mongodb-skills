/**
 * Projeções - Excluir Campos Específicos
 * 
 * Retorna todas as inspeções com resultado "Pass" ou "Warning" 
 * mas EXCLUI data (date) e código postal (zip) do resultado.
 */
db.inspections.find(
  { result: { $in: ["Pass", "Warning"] } },
  { date: 0, "address.zip": 0 }
)
