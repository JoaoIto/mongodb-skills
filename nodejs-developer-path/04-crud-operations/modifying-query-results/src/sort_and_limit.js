/**
 * Ordenando e Limitando Resultados
 * 
 * Retorna as três empresas de música com o maior número de funcionários. 
 * Garante uma ordem de classificação consistente limitando para 3 resultados.
 */
db.companies
  .find({ category_code: "music" })
  .sort({ number_of_employees: -1, _id: 1 })
  .limit(3);
