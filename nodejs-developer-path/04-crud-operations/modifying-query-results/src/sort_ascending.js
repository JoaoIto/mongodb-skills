/**
 * Ordenando Resultados - Ordem Crescente
 * 
 * Retorna dados sobre todas as empresas de música, ordenadas alfabeticamente de A a Z.
 */
db.companies.find({ category_code: "music" }).sort({ name: 1 });
