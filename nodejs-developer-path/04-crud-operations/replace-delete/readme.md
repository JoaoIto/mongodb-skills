# MongoDB CRUD Operations: Replace and Delete Documents

## Substituindo um Documento no MongoDB
Para substituir documentos no MongoDB, utilizamos o método `replaceOne()`. O método `replaceOne()` aceita os seguintes parâmetros:

* **filter**: Uma consulta (query) que corresponde ao documento a ser substituído.
* **replacement**: O novo documento que substituirá o antigo.
* **options**: Um objeto que especifica as opções para a atualização.

No vídeo anterior, usamos o campo `_id` para filtrar o documento. No nosso documento de substituição, fornecemos o documento inteiro que deve ser inserido em seu lugar. Aqui está o código de exemplo do vídeo:

```javascript
db.books.replaceOne(
  {
    _id: ObjectId("6282afeb441a74a98dbbec4e"),
  },
  {
    title: "Data Science Fundamentals for Python and MongoDB",
    isbn: "1484235967",
    publishedDate: new Date("2018-5-10"),
    thumbnailUrl:
      "https://m.media-amazon.com/images/I/71opmUBc2wL._AC_UY218_.jpg",
    authors: ["David Paper"],
    categories: ["Data Science"],
  }
)
```

---

## 🧠 Quizzes: Substituindo um Documento no MongoDB

### Pergunta 1
**Quais das seguintes afirmações sobre o método `replaceOne()` para o MongoDB Shell (`mongosh`) são verdadeiras? (Selecione todas que se aplicam.)**

* [x] **A.** Este método é usado para substituir um único documento que corresponda ao documento de filtro.
  > **Correto!** O método `replaceOne()` é usado para substituir um único documento que corresponda ao documento de filtro.
* [x] **B.** Este método aceita um documento de filtro, um documento de substituição e um documento opcional de opções.
  > **Correto!** O método `replaceOne()` aceita um documento de filtro, um documento de substituição e um documento opcional de opções.
* [ ] **C.** Este método pode substituir múltiplos documentos em uma coleção.
  > **Incorreto.** O método `replaceOne()` é usado para substituir um único documento que corresponda ao documento de filtro.
* [x] **D.** Este método retorna um documento contendo uma confirmação (acknowledgement) da operação, a contagem de documentos correspondidos (matched count), a contagem de documentos modificados (modified count) e um ID de upsert (se aplicável).
  > **Correto!** O método `replaceOne()` retorna um documento contendo uma confirmação da operação, a contagem de correspondências, a contagem de modificações e um ID de upsert (se aplicável).

### Pergunta 2
**Você deseja substituir o seguinte documento da coleção `birds` por um novo documento que contenha informações adicionais sobre avistamentos recentes, o nome científico de cada espécie e a envergadura das asas. Qual campo você deve usar no documento de filtro para garantir que este documento específico seja substituído? (Selecione uma opção.)**

```javascript
{ _id: ObjectId("6286809e2f3fa87b7d86dccd") },
{
  common_name: "Morning Dove",
  habitat: ["urban areas", "farms", "grassland"],
  diet: ["seeds"]
}
```

* [x] **A.** `{ _id: ObjectId("6286809e2f3fa87b7d86dccd") }`
  > **Correto!** Incluir o campo `_id` como documento de filtro garante que você substituirá este documento específico ao usar `replaceOne()`.
* [ ] **B.** `{ diet: ["seeds"] }`
  > **Incorreto.** `{ diet: ["seeds"] }` não é um campo exclusivo (único), portanto, você não pode garantir que substituirá este documento específico.
* [ ] **C.** `{ habitat: ["urban areas"] }`
  > **Incorreto.** `{ habitat: ["urban areas"] }` não é um campo exclusivo.
* [ ] **D.** `{ scientific_name: "Zenaida macroura" }`
  > **Incorreto.** O documento que você deseja substituir não contém `{ scientific_name: "Zenaida macroura" }`.

---

## Atualizando Documentos no MongoDB Usando updateOne()
O método `updateOne()` aceita um documento de filtro, um documento de atualização e um objeto opcional de opções. O MongoDB fornece operadores e opções de atualização para ajudar você a atualizar documentos. Nesta seção, cobriremos três deles: `$set`, `upsert` e `$push`.

### $set
O operador `$set` substitui o valor de um campo pelo valor especificado, conforme mostrado no código a seguir:

```javascript
db.podcasts.updateOne(
  {
    _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8"),
  },
  {
    $set: {
      subscribers: 98562,
    },
  }
)
```

### upsert
A opção `upsert` cria um novo documento se nenhum documento corresponder aos critérios filtrados. Aqui está um exemplo:

```javascript
db.podcasts.updateOne(
  { title: "The Developer Hub" },
  { $set: { topics: ["databases", "MongoDB"] } },
  { upsert: true }
)
```

### $push
O operador `$push` adiciona um novo valor a um campo de array. Aqui está um exemplo:

```javascript
db.podcasts.updateOne(
  { _id: ObjectId("5e8f8f8f8f8f8f8f8f8f8f8") },
  { $push: { hosts: "Nic Raboy" } }
)
```

---

## 🧠 Quizzes: Atualizando Documentos no MongoDB Usando updateOne()

### Pergunta 1
**Você deseja adicionar um elemento ao campo de array `items` na coleção `sales`. Para fazer isso, o que você deve incluir no documento de atualização? (Selecione uma opção.)**

* [ ] **A.** `{ $set: { items:[{ "name": "tablet", "price": 200}] } }`
  > **Incorreto.** O operador `$set` substitui o valor de um campo pelo valor especificado. Este exemplo de código substituiria o valor do campo `items`. Ele não adicionaria um elemento ao array existente.
* [ ] **B.** `{ $update: { items:[{ "name": "tablet", "price": 200}] } }`
  > **Incorreto.** Esta sintaxe é inválida. `$update` não é um operador do MongoDB.
* [x] **C.** `{ $push: { items:[{ "name": "tablet", "price": 200}] } }`
  > **Correto!** O operador `$push` adiciona um elemento a um campo de array. Neste exemplo, você adicionará um elemento de array para um tablet.
* [ ] **D.** `{ $upsert: { items:[{ "name": "tablet", "price": 200}] } }`
  > **Incorreto.** Esta sintaxe é inválida. A opção `upsert` pode adicionar um documento a uma coleção se ele ainda não existir. `upsert` não pode ser usado para atualizar o valor de um campo.

### Pergunta 2
**A Air France passou recentemente por uma inspeção. No documento a seguir, você precisa atualizar o campo `result` de Fail para Pass. Para fazer isso, o que você deve incluir no seu documento de atualização? (Selecione uma opção.)**

```javascript
{
  _id: ObjectId("56d61033a378eccde8a837f9"),
  id: '31041-2015-ENFO',
  certificate_number: 3045325,
  business_name: 'AIR FRANCE',
  date: 'Jun  9 2015',
  result: 'Fail',
  sector: 'Travel Agency - 440',
  address: {
    city: 'JAMAICA',
    zip: 11430,
    street: 'JFK INTL AIRPORT BLVD',
    number: 1
  }
}
```

* [x] **A.** `{ $set: {result: 'Pass'} }`
  > **Correto!** O operador `$set` substitui o valor de um campo pelo valor especificado, então usar este documento de atualização atualizaria o campo `result` para `'Pass'`.
* [ ] **B.** `{ $upsert: {result: 'Pass'} }`
  > **Incorreto.** Esta sintaxe é inválida. A opção `upsert` pode adicionar um documento a uma coleção se ele ainda não existir. `upsert` não pode ser usado como um operador de atualização para atualizar o valor de um campo.
* [ ] **C.** `{ $insert: {result: 'Pass'} }`
  > **Incorreto.** Esta sintaxe é inválida. `$insert` não é um operador de atualização do MongoDB.
* [ ] **D.** `{ $push: {result: 'Pass'} }`
  > **Incorreto.** O operador `$push` é utilizado para adicionar itens a um array, e não para atualizar o valor de um campo de texto.

---

## Atualizando Documentos no MongoDB Usando findAndModify()
O método `findAndModify()` é usado para encontrar e substituir (ou atualizar) um único documento no MongoDB. Ele aceita um documento de filtro (query), um documento de substituição/atualização (update), e um objeto opcional de opções. O código a seguir mostra um exemplo:

```javascript
db.podcasts.findAndModify({
  query: { _id: ObjectId("6261a92dfee1ff300dc80bf1") },
  update: { $inc: { subscribers: 1 } },
  new: true,
})
```

---

## Atualizando Documentos no MongoDB Usando updateMany()
Para atualizar múltiplos documentos, utilize o método `updateMany()`. Este método aceita um documento de filtro, um documento de atualização e um objeto opcional de opções. O código a seguir mostra um exemplo:

```javascript
db.books.updateMany(
  { publishedDate: { $lt: new Date("2019-01-01") } },
  { $set: { status: "LEGACY" } }
)
```

---

## 🧠 Quizzes: Atualizando Documentos no MongoDB Usando findAndModify() e updateMany()

### Pergunta 1
**Usando a coleção `zips`, você escreve a seguinte consulta. Esta consulta atualiza a população, que é armazenada no campo `pop`, em um código postal em Santa Fe, New Mexico. O que será retornado? (Selecione uma opção.)**

```javascript
db.zips.findAndModify({
  query: { _id: ObjectId("5c8eccc1caa187d17ca72ee7") },
  update: { $set: { pop: 40000 } },
  new: true,
})
```

* [x] **A.** O documento atualizado, que contém uma população de 40000
  > **Correto!** Quando a opção `new` é definida como `true`, `findAndModify()` retorna o documento atualizado. Esta consulta retornará o documento atualizado com uma população de 40000.
* [ ] **B.** O documento original, anterior à atualização, que contém uma população de 34054
  > **Incorreto.** Quando a opção `new` é definida como `true`, `findAndModify()` retorna o documento atualizado. Esta consulta retornará o documento atualizado com uma população de 40000.
* [ ] **C.** Todos os documentos com uma população de 40000
  > **Incorreto.** `findAndModify()` atualizará e retornará um único documento, não múltiplos documentos.
* [ ] **D.** Um novo documento que contém apenas um campo `_id` e um campo de população
  > **Incorreto.** `findAndModify()` inserirá um novo documento apenas se a opção `upsert` estiver definida como `true`. Esta consulta não inclui a opção `upsert`.

### Pergunta 2
**O que aconteceria se você executasse a seguinte consulta na coleção `zips`? Observe que atualmente não há nenhum documento para a cidade de Taos. (Selecione uma opção.)**

```javascript
db.zips.findAndModify({
  query: { zip: 87571 },
  update: { $set: { city: "TAOS", state: "NM", pop: 40000 } },
  upsert: true,
  new: true,
})
```

* [ ] **A.** Um novo documento seria inserido porque a opção `new` está definida como `true`.
  > **Incorreto.** Quando a opção `new` está definida como `true`, a versão atualizada de um documento é retornada, independentemente de o documento ser novo ou existente.
* [x] **B.** Um novo documento seria inserido porque a opção `upsert` está definida como `true`.
  > **Correto!** Quando a opção `upsert` está definida como `true`, um novo documento será inserido se um correspondente não existir. Para documentos existentes, a opção `upsert` fará com que o documento seja atualizado.
* [ ] **C.** Você receberia um erro, porque você não pode inserir um novo documento ao usar o método `findAndModify()`.
  > **Incorreto.** Se você usar `findAndModify()` para inserir um novo documento sem incluir a opção `upsert`, você receberá um erro ou uma resposta nula, e o documento não será inserido. Neste exemplo, o documento é inserido porque a opção `upsert` está definida como `true`.

### Pergunta 3
**Três turmas de ciência da computação, com os `class_id`s 377, 259 e 360, ganharam 100 pontos de crédito extra por competirem em um hackathon. Você precisa atualizar o banco de dados para que todos os alunos que estão nessas turmas recebam os pontos de crédito extra. Note que você usará a coleção `grades`, que está no banco de dados `sample_training`. Qual das seguintes consultas alcançará esse objetivo? (Selecione uma opção.)**

* [ ] **A.** 
  ```javascript
  db.grades.insertMany(
    { class_id: { $in: [ 377, 259, 360 ] } },
    { $push: { scores: { type : 'extra credit', score: 100 } } }
  )
  ```
* [x] **B.** 
  ```javascript
  db.grades.updateMany(
    { class_id: { $in: [ 377, 259, 360 ] } },
    { $push: { scores: { type : 'extra credit', score: 100 } } }
  )
  ```
  > **Correto!** Como precisamos atualizar os documentos de **todos** os alunos que correspondem à query, devemos usar `updateMany()` ao invés de métodos que alteram apenas um documento (`updateOne`, `findAndModify`) ou métodos de inserção (`insertMany`). O filtro `$in` garante a seleção correta e `$push` adiciona os pontos.
* [ ] **C.** 
  ```javascript
  db.grades.updateOne(
    { class_id: { $in: [ 377, 259, 360 ] } },
    { $push: { scores: { type : 'extra credit', score: 100 } } }
  )
  ```
* [ ] **D.** 
  ```javascript
  db.grades.findAndModify(
    { class_id: { $in: [ 377, 259, 360 ] } },
    { $push: { scores: { type : 'extra credit', score: 100 } } }
  )
  ```

---

## Deletando Documentos no MongoDB
Para deletar documentos, use os métodos `deleteOne()` ou `deleteMany()`. Ambos os métodos aceitam um documento de filtro e um objeto de opções.

### Deletar um Único Documento
O código a seguir mostra um exemplo do método `deleteOne()`:

```javascript
db.podcasts.deleteOne({ _id: ObjectId("6282c9862acb966e76bbf20a") })
```

### Deletar Múltiplos Documentos
O código a seguir mostra um exemplo do método `deleteMany()`:

```javascript
db.podcasts.deleteMany({ category: "crime" })
```

---

## 🧠 Quizzes: Deletando Documentos no MongoDB

### Pergunta 1
**A United Airlines é a única companhia aérea que possui uma rota do Aeroporto de Denver (DEN) para o Aeroporto Northwest Arkansas (XNA). Ela decidiu cancelar esta rota devido ao baixo número de passageiros. Qual das seguintes consultas deletará a rota? (Selecione uma opção.)**
*Nota: Estes documentos estão contidos na coleção `routes` no banco de dados `sample_training`.*

* [ ] **A.** `db.routes.deleteOne({ "airline.name": "United Airlines"})`
  > **Incorreto.** Isso deletaria o primeiro documento encontrado da United Airlines, que pode não ser a rota DEN -> XNA.
* [ ] **B.** `db.routes.delete({ "airline.name": "United Airlines"})`
  > **Incorreto.** O método `delete()` não é válido no MongoDB.
* [ ] **C.** `db.routes.delete({ src_airport: "DEN", dst_airport: "XNA"})`
  > **Incorreto.** O método `delete()` não é válido no MongoDB.
* [x] **D.** `db.routes.deleteOne({ src_airport: "DEN", dst_airport: "XNA"})`
  > **Correto!** Esta consulta especifica a rota correta utilizando os campos adequados e utiliza o método válido `deleteOne()`.

### Pergunta 2
**A Air Berlin pediu falência e encerrou suas operações. Você precisa atualizar a coleção `routes` para deletar todos os documentos que contenham um nome de companhia aérea (airline name) de Air Berlin. Qual das seguintes consultas você deve usar? (Selecione uma opção.)**

* [ ] **A.** `db.routes.deleteOne({ "airline.name": "Air Berlin"})`
  > **Incorreto.** `db.collection.deleteOne()` deleta um único documento. Esta consulta deletará um documento da Air Berlin, não todos os documentos contendo Air Berlin.
* [ ] **B.** `db.routes.delete("Air Berlin")`
  > **Incorreto.** `db.collection.delete()` não é um método válido no MongoDB.
* [x] **C.** `db.routes.deleteMany({ "airline.name": "Air Berlin"})`
  > **Correto!** Esta consulta deletará todos os documentos que contêm um nome de companhia aérea Air Berlin.
* [ ] **D.** `db.routes.deleteMany("Air Berlin")`
  > **Incorreto.** Esta sintaxe está incorreta. Você precisa incluir um documento de consulta que contenha um campo e um valor especificado.

---

## 🛠️ Scripts de Exemplo (Lab)
Para facilitar o seu estudo, todos os exemplos de código vistos nesta unidade foram salvos como scripts `.js` dentro da pasta `src`. Você pode usá-los como referência ou executá-los no `mongosh`:

* 📝 **Substituição e Atualização Única:**
  * [`replaceOne.js`](./src/replaceOne.js) - Substitui um documento inteiro pelo filtro.
  * [`updateOne_set.js`](./src/updateOne_set.js) - Atualiza o valor de um campo específico com `$set`.
  * [`updateOne_upsert.js`](./src/updateOne_upsert.js) - Atualiza ou insere um novo documento caso não exista (`upsert: true`).
  * [`updateOne_push.js`](./src/updateOne_push.js) - Adiciona um novo item a um campo do tipo array com `$push`.
  * [`findAndModify.js`](./src/findAndModify.js) - Encontra e atualiza um documento, retornando sua nova versão (`new: true`).
* 📝 **Atualização em Massa:**
  * [`updateMany.js`](./src/updateMany.js) - Atualiza múltiplos documentos que correspondem ao filtro.
* 🗑️ **Exclusão de Documentos:**
  * [`deleteOne.js`](./src/deleteOne.js) - Deleta o primeiro documento que corresponde ao filtro.
  * [`deleteMany.js`](./src/deleteMany.js) - Deleta múltiplos documentos baseados em um filtro.

---

## 🎓 Conclusão: MongoDB CRUD Operations: Replace and Delete Documents
Nesta unidade, você aprendeu como modificar resultados de consulta (query) com o MongoDB. Especificamente, você:

* Substituiu um único documento usando `db.collection.replaceOne()`.
* Atualizou um valor de campo usando o operador de atualização `$set` em `db.collection.updateOne()`.
* Adicionou um valor a um array usando o operador de atualização `$push` em `db.collection.updateOne()`.
* Adicionou um novo valor de campo a um documento usando a opção `upsert` em `db.collection.updateOne()`.
* Encontrou e modificou um documento usando `db.collection.findAndModify()`.
* Atualizou múltiplos documentos usando `db.collection.updateMany()`.
* Deletou um documento usando `db.collection.deleteOne()`.

---

## 🔗 Resources (Recursos Adicionais)
Use os seguintes recursos para aprender mais sobre como modificar resultados de consulta no MongoDB:

* **Lesson 01: Replacing a Document in MongoDB**
  * MongoDB Docs: `replaceOne()`
* **Lesson 02: Updating MongoDB Documents by Using updateOne()**
  * MongoDB Docs: Update Operators
  * MongoDB Docs: `$set`
  * MongoDB Docs: `$push`
  * MongoDB Docs: `upsert`
* **Lesson 03: Updating MongoDB Documents by Using findAndModify()**
  * MongoDB Docs: `findAndModify()`
* **Lesson 04: Updating MongoDB Documents by Using updateMany()**
  * MongoDB Docs: `updateMany()`
* **Lesson 05: Deleting Documents in MongoDB**
  * MongoDB Docs: `deleteOne()`
  * MongoDB Docs: `deleteMany()`
