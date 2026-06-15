/**
 * Contando Documentos com Filtro
 * 
 * Conta o número de viagens (trips) com mais de 120 minutos feitas por assinantes (subscribers)
 */
db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" })
