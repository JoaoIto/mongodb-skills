# MongoDB CRUD Operations: Modifying Query Results

## Ordenando e Limitando Resultados de Consulta no MongoDB
Revise o seguinte código, que demonstra como ordenar e limitar resultados de consultas.

### Ordenando Resultados
Use `cursor.sort()` para retornar os resultados da consulta em uma ordem especificada. Dentro dos parênteses do `sort()`, inclua um objeto que especifica os campos para ordenar e a ordem da classificação. Use `1` para ordem crescente e `-1` para ordem decrescente.

Sintaxe:
```javascript
db.collection.find(<query>).sort(<sort>)
```

Exemplo:
```javascript
// Retorna dados sobre todas as empresas de música, ordenadas alfabeticamente de A a Z.
db.companies.find({ category_code: "music" }).sort({ name: 1 });
```

Para garantir que os documentos sejam retornados em uma ordem consistente, inclua um campo que contenha valores únicos na ordenação. Uma maneira fácil de fazer isso é incluir o campo `_id` no `sort`. Aqui está um exemplo:

```javascript
// Retorna dados sobre todas as empresas de música, ordenadas alfabeticamente de A a Z. Garante uma ordem de classificação consistente.
db.companies.find({ category_code: "music" }).sort({ name: 1, _id: 1 });
```

### Limitando Resultados
Use `cursor.limit()` para especificar o número máximo de documentos que o cursor retornará. Dentro dos parênteses de `limit()`, especifique o número máximo de documentos a serem retornados.

Sintaxe:
```javascript
db.collection.find(<query>).limit(<number>)
```

Exemplo:
```javascript
// Retorna as três empresas de música com o maior número de funcionários. Garante uma ordem de classificação consistente.
db.companies
  .find({ category_code: "music" })
  .sort({ number_of_employees: -1, _id: 1 })
  .limit(3);
```

---

## Retornando Dados Específicos de uma Consulta no MongoDB (Projeção)
Revise o código a seguir, que demonstra como retornar campos selecionados de uma consulta.

### Adicionar um Documento de Projeção
Para especificar campos para incluir ou excluir no conjunto de resultados, adicione um documento de projeção como o segundo parâmetro na chamada para `db.collection.find()`.

Sintaxe:
```javascript
db.collection.find( <query>, <projection> )
```

### Incluir um Campo
Para incluir um campo, defina seu valor como `1` no documento de projeção.

Sintaxe:
```javascript
db.collection.find( <query>, { <field> : 1 })
```

Exemplo:
```javascript
// Retorna todas as inspeções de restaurantes - apenas os campos business_name, result, e _id
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1 }
)
```

### Excluir um Campo
Para excluir um campo, defina seu valor como `0` no documento de projeção.

Sintaxe:
```javascript
db.collection.find(query, { <field> : 0, <field>: 0 })
```

Exemplo:
```javascript
// Retorna todas as inspeções com resultado "Pass" ou "Warning" - exclui data (date) e código postal (zip)
db.inspections.find(
  { result: { $in: ["Pass", "Warning"] } },
  { date: 0, "address.zip": 0 }
)
```

Embora o campo `_id` seja incluído por padrão, ele pode ser omitido (suprimido) definindo seu valor como `0` em qualquer projeção.

```javascript
// Retorna todas as inspeções de restaurantes - apenas os campos business_name e result (suprime _id)
db.inspections.find(
  { sector: "Restaurant - 818" },
  { business_name: 1, result: 1, _id: 0 }
)
```

---

## Contando Documentos em uma Coleção no MongoDB
Revise o seguinte código, que demonstra como contar o número de documentos que correspondem a uma consulta.

### Contar Documentos
Use `db.collection.countDocuments()` para contar o número de documentos que correspondem a uma consulta. O `countDocuments()` aceita dois parâmetros: um documento de consulta (`query`) e um documento de opções (`options`).

Sintaxe:
```javascript
db.collection.countDocuments( <query>, <options> )
```
A consulta (`query`) seleciona os documentos a serem contados.

Exemplos:
```javascript
// Conta o número de documentos na coleção trips
db.trips.countDocuments({})
```
```javascript
// Conta o número de viagens (trips) com mais de 120 minutos feitas por assinantes (subscribers)
db.trips.countDocuments({ tripduration: { $gt: 120 }, usertype: "Subscriber" })
```

---

## 🛠️ Scripts de Exemplo (Lab)
Para facilitar o seu estudo, todos os exemplos de código vistos nesta unidade foram salvos como scripts `.js` dentro da pasta `src`. Você pode usá-los como referência ou executá-los no `mongosh`:

* 📝 **Ordenação e Limitação:**
  * [`sort_ascending.js`](./src/sort_ascending.js) - Retorna documentos ordenados alfabeticamente.
  * [`sort_consistent.js`](./src/sort_consistent.js) - Ordena documentos garantindo consistência com `_id`.
  * [`sort_and_limit.js`](./src/sort_and_limit.js) - Ordena de forma decrescente e limita o número de retornos.
* 📝 **Projeções (Retornando dados específicos):**
  * [`projection_include.js`](./src/projection_include.js) - Inclui campos específicos no resultado.
  * [`projection_exclude.js`](./src/projection_exclude.js) - Exclui campos específicos do resultado.
  * [`projection_exclude_id.js`](./src/projection_exclude_id.js) - Inclui campos e suprime explicitamente o `_id`.
* 🔢 **Contagem de Documentos:**
  * [`count_all.js`](./src/count_all.js) - Conta todos os documentos de uma coleção.
  * [`count_query.js`](./src/count_query.js) - Conta documentos que correspondem a um critério de busca.

---

## 🧠 Quizzes: Modifying Query Results

### Pergunta 1
**Usando a coleção `inspections` no banco de dados `sample_training`, você precisa encontrar todas as inspeções que foram aprovadas (`"Pass"`). Seu gerente solicitou que você organize esses dados pelo número do certificado (`certificate_number`) em ordem crescente. Qual consulta você deve usar? (Selecione uma opção.)**

* [x] **A.** `db.inspections.find({ result: "Pass" }).sort({ certificate_number: 1 });`
  > **Correto!** Esta consulta retornará documentos de empresas que passaram na inspeção ordenados pelo número do certificado em ordem crescente.
* [ ] **B.** `db.inspections.find({ result: "Pass" }).sort({ certificate_number: -1 });`
  > **Incorreto.** Esta consulta retornará documentos ordenados em ordem decrescente. Você precisa ordenar em ordem crescente.
* [ ] **C.** `db.inspections.find({ result: "Pass" }, { sort: { certificate_number: 1 } })`
  > **Incorreto.** `sort()` é um método de cursor, portanto, deve ser anexado ao final da consulta.
* [ ] **D.** `db.inspections.find({ result: "Pass" }, { sort: { certificate_number: -1 } })`
  > **Incorreto.** `sort()` é um método de cursor, portanto, deve ser anexado ao final da consulta.

### Pergunta 2
**Você está considerando criar um novo nível de associação para o seu serviço de compartilhamento de bicicletas para usuários que fazem viagens longas. Usando a coleção `trips` no banco de dados `sample_training`, você precisa encontrar as viagens feitas por assinantes (`Subscriber`) com a duração de viagem mais longa (`tripduration`). Retorne os top 5 resultados em ordem decrescente. Qual consulta você deve usar? (Selecione uma opção.)**

* [ ] **A.** `db.trips.find( { usertype: "Subscriber"},( sort: { tripduration: - 1 }), { limit :5 })`
  > **Incorreto.** Esta consulta retornará um erro de sintaxe. Lembre-se de encadear (append) `sort()` e `limit()` ao método `find()`.
* [ ] **B.** `db.trips.find( { usertype: "Subscriber"},( sort: { tripduration: 1 }), { limit :5 })`
  > **Incorreto.** Esta consulta retornará um erro de sintaxe. Lembre-se de encadear `sort()` e `limit()` ao método `find()`.
* [ ] **C.** `db.trips.find({ usertype: "Subscriber"}).sort({ tripduration: 1 }).limit(5)`
  > **Incorreto.** Esta consulta retornará os 5 documentos com a *menor* duração de viagem em ordem crescente. Você precisa retornar os documentos com as maiores durações em ordem decrescente.
* [x] **D.** `db.trips.find({ usertype: "Subscriber"}).sort({ tripduration: - 1 }).limit(5)`
  > **Correto!** Esta consulta retornará os 5 documentos com as maiores durações de viagens, realizadas por assinantes, em ordem decrescente.

### Pergunta 3
**Quais das seguintes afirmações são verdadeiras sobre um documento de projeção? (Selecione todas que se aplicam.)**

* [x] **A.** Podemos incluir campos em nossos resultados definindo seus valores como 1 no documento de projeção.
  > **Correto!** Podemos incluir campos em nossos resultados definindo seus valores como 1 no documento de projeção.
* [x] **B.** Podemos excluir campos de nossos resultados definindo seus valores como 0 no documento de projeção.
  > **Correto!** Podemos excluir campos de nossos resultados definindo seus valores como 0 no documento de projeção.
* [x] **C.** Podemos incluir ou excluir campos nos resultados, mas não ambos. O campo `_id` é a exceção a essa regra.
  > **Correto!** Podemos incluir ou excluir campos nos resultados, mas não ambos. No entanto, o campo `_id` é a exceção a essa regra.
* [ ] **D.** Declarações de inclusão e exclusão, sem incluir as declarações do `_id`, podem ser combinadas entre si em um documento de projeção.
  > **Incorreto.** Não podemos combinar declarações de inclusão e exclusão entre si em um documento de projeção. No entanto, o campo `_id` é a exceção a essa regra.

### Pergunta 4
**Se não quisermos retornar o campo `_id`, podemos adicioná-lo ao documento de projeção e defini-lo com qual dos seguintes valores? (Selecione todas que se aplicam.)**

* [x] **A.** `0`
  > **Correto!** Definir o valor do campo `_id` como `0` o excluirá dos resultados.
* [ ] **B.** `1`
  > **Incorreto.** Definir o valor de um campo como `1` o incluirá nos resultados. Qual valor excluirá o campo `_id`?
* [ ] **C.** `-1`
  > **Incorreto.** `-1` não é um valor válido para projeção. Qual valor excluirá o campo `_id`?
* [ ] **D.** Nenhuma das alternativas
  > **Incorreto.** Devemos definir o campo `_id` com um valor numérico no documento de projeção. Qual valor excluirá o campo `_id`?

### Pergunta 5
**Quais das seguintes afirmações são verdadeiras sobre o método de coleção `countDocuments()`? (Selecione todas que se aplicam.)**

* [x] **A.** O método aceita um parâmetro de consulta (`query`), que seleciona os documentos a serem contados.
  > **Correto!** A sintaxe correta para `.countDocuments()` é `db.collection.countDocuments(<query>)`.
* [x] **B.** Podemos usar o método para contar todos os documentos em uma coleção.
  > **Correto!** Usamos `countDocuments()` com um documento vazio no parâmetro de consulta para contar todos os documentos em uma coleção.
* [ ] **C.** O método não suporta o uso de operadores em consultas que são passadas como parâmetro.
  > **Incorreto.** O método `.countDocuments()` aceita consultas que usam operadores, como `$elemMatch` ou `$lt`.

### Pergunta 6
**O que podemos esperar que seja retornado ao executar `db.inspections.countDocuments({})`? (Selecione uma opção.)**

* [ ] **A.** Este comando não retorna nada porque requer um parâmetro de consulta.
  > **Incorreto.** Usamos `countDocuments()` com um documento vazio no parâmetro de consulta para retornar o número total de documentos em uma coleção.
* [ ] **B.** Este comando retorna o número total de documentos no banco de dados `inspections`.
  > **Incorreto.** Usamos `countDocuments()` com um documento vazio no parâmetro de consulta para retornar o número total de documentos em uma coleção.
* [x] **C.** Este comando retorna o número total de documentos na coleção `inspections`.
  > **Correto!** Usamos `countDocuments()` com um documento vazio no parâmetro de consulta para retornar o número total de documentos em uma coleção.

---

## 🎓 Conclusão: MongoDB CRUD Operations: Modifying Query Results
Nesta unidade, você aprendeu como modificar resultados de consulta com o MongoDB. Especificamente, você aprendeu como:

* Retornar resultados de consulta em uma ordem especificada usando `cursor.sort()`.
* Restringir o número de resultados retornados usando `cursor.limit()`.
* Especificar campos a serem retornados adicionando um parâmetro de documento de projeção nas chamadas para `db.collection.find()`.
* Contar o número de documentos que correspondem a uma consulta usando `db.collection.countDocuments()`.

---

## 🔗 Resources (Recursos Adicionais)
Use os seguintes recursos para aprender mais sobre como modificar resultados de consulta no MongoDB:

* **Lesson 01: Sorting and Limiting Query Results in MongoDB**
  * MongoDB Docs: `cursor.sort()`
  * MongoDB Docs: `cursor.limit()`
* **Lesson 02: Returning Specific Data from a Query in MongoDB**
  * MongoDB Docs: Project Fields to Return from Query
  * MongoDB Docs: Projection Restrictions
* **Lesson 03: Counting Documents in a MongoDB Collection**
  * MongoDB Docs: `db.collection.countDocuments()`
