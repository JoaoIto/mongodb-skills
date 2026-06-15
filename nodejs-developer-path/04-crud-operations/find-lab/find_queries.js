// Laboratórios de Busca (Read) no MongoDB

// Garanta que está conectado no banco de dados adequado
// use("sample_supplies")

// ==========================================
// PARTE 1: Buscas Exatas (Equality)
// ==========================================

// 1. Busca um documento exato através da sua chave primária _id (ObjectId)
db.sales.findOne({ _id: ObjectId('5bd761dcae323e45a93ccff4') });

// 2. Busca um documento que contenha a data exata (precisa passar pela formatação ISODate)
db.sales.findOne({ saleDate: ISODate('2017-12-03T18:39:48.253Z') });

// ==========================================
// PARTE 2: Busca Múltipla com Operador $in
// ==========================================

// 3. Busca e lista TODOS os documentos onde a localização atenda à pelo menos uma das strings do Array
db.sales.find({ storeLocation: { $in: ["London", "New York"] } });
