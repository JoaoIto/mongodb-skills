/**
 * Projeções - Incluir Campos Específicos
 * 
 * Retorna todas as inspeções de restaurantes - incluindo APENAS 
 * os campos business_name, result, e o _id (que vem por padrão).
 */
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1 }
)
