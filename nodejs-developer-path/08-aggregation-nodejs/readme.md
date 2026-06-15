# MongoDB Aggregation with Node.js

Bem-vindo ao módulo de **Aggregation com Node.js**! O MongoDB Aggregation Framework permite transformar dados da sua coleção passando documentos de um estágio para outro. Quando integramos isso em aplicações Node.js, ganhamos um poder imenso para criar relatórios, dashboards e sumarizar métricas diretamente no backend.

## 📋 Sumário
* [O Framework de Agregação no Node.js](#o-framework-de-agregação-no-nodejs)
* [Usando $match e $group no Node.js](#usando-match-e-group-no-nodejs)
* [Usando $sort e $project no Node.js](#usando-sort-e-project-no-nodejs)
* [Quizzes: Aggregation with Node.js](#-quizzes-aggregation-with-nodejs)
* [Lab Prático: Aggregation App](./aggregation-app/readme.md)

---

## O Framework de Agregação no Node.js
Para rodar um pipeline de agregação no Node.js, nós utilizamos o método `.aggregate()` na coleção e passamos um array com os estágios do pipeline. O método retorna um *Cursor*, e iteramos sobre ele para processar os resultados sem sobrecarregar a memória do servidor.

## Usando $match e $group no Node.js

### $match
O estágio `$match` filtra documentos utilizando validações simples de igualdade ou operadores de comparação. Ele aceita um documento de query normal e passa apenas os documentos que deram "match" para o próximo estágio. Deve ser colocado o mais cedo possível no seu pipeline para reduzir o volume de documentos nas etapas subsequentes.

### $group
O estágio `$group` separa os documentos de acordo com uma chave (`_id`) e retorna um documento para cada agrupamento. É muito usado junto de acumuladores como `$sum`, `$avg`, etc.

**Exemplo em Node.js (Filtrar e Agrupar contas):**
```javascript
const pipeline = [
  // Estágio 1: Filtra contas com saldo menor que 1000
  { $match: { balance: { $lt: 1000 } } },
  // Estágio 2: Calcula a média e o total agrupado por account_type
  {
    $group: {
      _id: "$account_type",
      total_balance: { $sum: "$balance" },
      avg_balance: { $avg: "$balance" },
    },
  },
]

// Executando
let result = await accountsCollection.aggregate(pipeline);
for await (const doc of result) {
  console.log(doc);
}
```

## Usando $sort e $project no Node.js

### $sort
Pega os documentos recebidos e os ordena com base em um ou mais campos específicos (`1` para ascendente, `-1` para descendente).

### $project
Pega os documentos recebidos e repassa adiante apenas um subconjunto de campos escolhidos (usando `1` ou `0`). Também é capaz de **computar e criar novos campos** na projeção.

**Exemplo em Node.js (Criando um campo computado):**
```javascript
const pipeline = [
  // Filtra as contas do tipo checking com balance >= 1500
  { $match: { account_type: "checking", balance: { $gte: 1500 } } },
  
  // Ordena pelo maior balance primeiro
  { $sort: { balance: -1 } },

  // Projeta apenas alguns campos originais e CRIA o "gbp_balance" (libras)
  {
    $project: {
      _id: 0,
      account_id: 1,
      account_type: 1,
      balance: 1,
      // Dividindo o saldo atual por 1.3
      gbp_balance: { $divide: ["$balance", 1.3] },
    },
  },
]
```

---

## 🧠 Quizzes: Aggregation with Node.js

### Pergunta 1
**Para o que o framework de agregação é usado? (Selecione uma opção.)**
* [x] **A.** Processar registros de dados e retornar resultados computados.
  > **Correto!** As operações de agregação processam registros de dados e retornam resultados computados (como em relatórios e metadados).
* [ ] **B.** Criar gráficos.
* [ ] **C.** Criar comandos básicos de CRUD.
* [ ] **D.** Criar funções serverless.

### Pergunta 2
**Por quais componente(s) de um aggregation pipeline os documentos passam para serem processados em sequência? (Selecione uma opção.)**
* [x] **A.** Aggregation stages (Estágios de agregação).
  > **Correto!** Um pipeline de agregação consiste em um ou mais estágios que processam os documentos em sequência.
* [ ] **B.** Aggregation operators.
* [ ] **C.** O comando `db.collection.aggregate()`.

### Pergunta 3
**Você deseja encontrar as listagens do Airbnb de uma "casa/apartamento inteiro" (Entire home/apt), agrupados pelo número de quartos (bedrooms) e calcular o preço médio. Dado o documento amostral da coleção `listingsAndReviews`, qual das opções a seguir deve ser o PRIMEIRO estágio no seu pipeline? (Selecione uma opção.)**
* [ ] **A.** `{"$group": {"_id": "$bedrooms", "avg_price": {"$avg": "$price"}}}`
* [x] **B.** `{"$match": {"room_type": "Entire home/apt"}}`
  > **Correto!** Você sempre deve utilizar o `$match` o mais cedo possível no pipeline para filtrar apenas os dados que interessam antes de aplicar funções mais pesadas como `$group`.
* [ ] **C.** `{"$group": {"room_type": "Entire home/apt"}}`
* [ ] **D.** `{"$match": {"bedrooms": "price"}}`

### Pergunta 4
**Sua última etapa no pipeline para as listagens de Airbnb é retornar os resultados em ordem ascendente pelo preço médio calculado. Dado o trecho de código onde o segundo estágio já agrupou e gerou o campo `"avg_price"`, qual opção você usaria para completar o estágio de ordenação? (Selecione uma opção.)**
* [ ] **A.** `{"$limit": 1}`
* [ ] **B.** `{"$sort": {"avg_price": -1}}`
* [x] **C.** `{"$sort": {"avg_price": 1}}`
  > **Correto!** O estágio `$sort` recebe a chave `avg_price` recém-criada, e passamos `1` para ditar a ordem ascendente.
* [ ] **D.** `{"$project": {"avg_price": 1}}`

### Pergunta 5
**Você identificou que deseja ficar em uma casa inteira com 3 quartos. Neste novo pipeline, você precisa adicionar um estágio que faça o seguinte: retorne a "description" e "listing_url", calcule um novo "total_price" que soma "price" e "cleaning_fee", e suprima a "id" (Oculte o `_id`). Qual das opções completa a requisição? (Selecione uma opção.)**
* [x] **A.** `{"$project": {"description": 1, "listing_url": 1, "_id": 0, "total_price": {"$sum": ["$price", "$cleaning_fee"]}}}`
  > **Correto!** O `$project` selecionou exatamente o que foi pedido com `1`, removeu o `_id` com `0` e gerou a computação via expressão `$sum`.
* [ ] **B.** `{"$project": { description: 0, listing_url: 0}}`
* [ ] **C.** `{"$return": {description: 1, listing_url: 1, _id: 0, total_price: {$sum: ['$price', '$cleaning_fee']}}}`
* [ ] **D.** `{"$return": { description: 0, listing_url: 0}}`

---

## 📚 Recursos de Estudo

Nesta unidade, você aprendeu como:
* Definir um pipeline de agregação e seus estágios e operadores.
* Construir os estágios `$match` e `$group` de um pipeline no Node.js.
* Construir os estágios `$sort` e `$project` de um pipeline no Node.js.

Use os seguintes recursos para aprender mais sobre como executar operações com o MongoDB e Node.js:

* **Lesson 01: Building a MongoDB Aggregation Pipeline in Node.js Applications**
  * MongoDB Docs: [Aggregation](https://www.mongodb.com/docs/manual/aggregation/)
  * MongoDB Docs: [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/)
  * MongoDB Docs: [Aggregation Stages](https://www.mongodb.com/docs/manual/reference/operator/aggregation-pipeline/)
* **Lesson 02: Using MongoDB Aggregation Stages with Node.js: $match and $group**
  * MongoDB Docs: [$match](https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/)
  * MongoDB Docs: [$group](https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/)
* **Lesson 03: Using MongoDB Aggregation Stages with Node.js: $sort and $project**
  * MongoDB Docs: [$sort](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sort/)
  * MongoDB Docs: [$project](https://www.mongodb.com/docs/manual/reference/operator/aggregation/project/)
