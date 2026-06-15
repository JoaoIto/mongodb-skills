# MongoDB CRUD Operations: Insert and Find Documents

Neste novo módulo, vamos explorar as operações de **CRUD** (Create, Read, Update, Delete), focando inicialmente na criação e leitura de documentos no MongoDB.

## Inserindo Documentos em uma Coleção

Podemos inserir dados utilizando métodos diferentes, dependendo se queremos inserir apenas um documento por vez ou vários de uma só vez.

### 1. Inserir um Único Documento (`insertOne`)
Utilize `insertOne()` para inserir um único documento na coleção. O método recebe um objeto JSON contendo os dados.
```javascript
db.grades.insertOne({
  student_id: 654321,
  products: [
    { type: "exam", score: 90 },
    { type: "homework", score: 59 },
    { type: "quiz", score: 75 },
    { type: "homework", score: 88 },
  ],
  class_id: 550,
})
```

### 2. Inserir Múltiplos Documentos (`insertMany`)
Utilize `insertMany()` para inserir múltiplos documentos de uma vez. O método recebe um **array** de objetos JSON. Cada documento deve ser separado por vírgula.
```javascript
db.grades.insertMany([
  {
    student_id: 546789,
    products: [
      { type: "quiz", score: 50 },
      { type: "homework", score: 70 },
      { type: "quiz", score: 66 },
      { type: "exam", score: 70 },
    ],
    class_id: 551,
  },
  {
    student_id: 777777,
    products: [
      { type: "exam", score: 83 },
      { type: "quiz", score: 59 },
      { type: "quiz", score: 72 },
      { type: "quiz", score: 67 },
    ],
    class_id: 550,
  },
  {
    student_id: 223344,
    products: [
      { type: "exam", score: 45 },
      { type: "homework", score: 39 },
      { type: "quiz", score: 40 },
      { type: "homework", score: 88 },
    ],
    class_id: 551,
  },
])
```

## 📖 Sumário de Laboratórios

* **[Lab: Inserting Documents in a MongoDB Collection](./insert-lab/readme.md)**: Exercício prático inserindo e buscando uma nova conta (`account`) utilizando o MongoDB Shell.
* **[Lab: Inserting Multiple Documents (`insertMany`)](./insert-many-lab/readme.md)**: Exercício prático inserindo várias contas simultaneamente passando um *Array* de objetos para o terminal.
* **[Lab: Finding Documents in a MongoDB Collection](./find-lab/readme.md)**: Exercício ensinando como buscar documentos de forma exata (`findOne`) e utilizando operadores numéricos.
* **[Lab: Querying Array Elements (`$elemMatch`)](./array-queries-lab/readme.md)**: Teoria, código prático e quizzes de como buscar itens básicos ou objetos complexos associados dentro de arrays.
* **[Lab: Finding Documents by Using Logical Operators](./logical-operators-lab/readme.md)**: Aplicação de `$and` implícito, `$or`, e o uso explícito de `$and` na intersecção de expressões complexas.
* **[Lab: Replace and Delete Documents](./replace-delete/readme.md)**: Teoria, código prático e quizzes sobre como substituir e excluir documentos usando `replaceOne()`, `deleteOne()` e `deleteMany()`.
* **[Lab: Modifying Query Results](./modifying-query-results/readme.md)**: Teoria, código prático e quizzes sobre como manipular resultados de busca usando `sort()`, `limit()` e projeções de campos.

---

## 🎓 Conclusão: CRUD Parte 1 (Insert & Find)

Neste módulo, nós aprendemos a inserir e encontrar documentos em coleções usando o MongoDB Shell. Exploramos a criação de consultas complexas através dos seguintes operadores:

### Operadores de Comparação (Comparison Operators)
* `$gt` (Greater Than)
* `$lt` (Less Than)
* `$lte` (Less Than or Equal To)
* `$gte` (Greater Than or Equal To)

### Operadores Lógicos (Logical Operators)
* `$and`
* `$or`

### Operadores em Arrays
* Como buscar por valores primitivos dentro de um array.
* `$elemMatch` para bater múltiplos critérios dentro de um único subdocumento de um array de objetos.

🎉 **Conquista Desbloqueada:** Ao completar esta unidade, **finalizamos 30%** do conteúdo focado em CRUD exigido no exame *Associate Developer Certification*!

---

## 🔗 Resources (Recursos Adicionais)

* **Lesson 01: Inserting Documents**
  * MongoDB Docs: `insertOne()` e `insertMany()`
* **Lesson 02: Finding Documents**
  * MongoDB Docs: `find()` e o operador `$in`
* **Lesson 03: Comparison Operators**
  * MongoDB Docs: Comparison Operators
* **Lesson 04: Querying Array Elements**
  * MongoDB Docs: `$elemMatch` e Querying Arrays
* **Lesson 05: Logical Operators**
  * MongoDB Docs: Logical Operators
