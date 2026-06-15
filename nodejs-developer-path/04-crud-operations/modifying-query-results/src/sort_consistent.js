/**
 * Ordenando Resultados - Ordem Consistente
 * 
 * Retorna dados sobre todas as empresas de música, ordenadas alfabeticamente de A a Z. 
 * Garante uma ordem de classificação consistente adicionando o _id.
 */
db.companies.find({ category_code: "music" }).sort({ name: 1, _id: 1 });
