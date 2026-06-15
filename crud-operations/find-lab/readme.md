# Lab: Finding Documents in a MongoDB Collection

Neste laboratório, o foco muda da Inserção (Create) para a Busca (Read). O objetivo é aprender a usar os métodos `find()` e `findOne()` para filtrar e resgatar documentos baseados em critérios específicos na coleção `sales` do banco de dados `sample_supplies`.

## 🔍 Parte 1: Busca por Igualdade Exata (Equality)

A busca por igualdade retorna documentos onde o campo especificado seja *exatamente igual* ao valor passado no filtro.

### Busca por `_id`
Buscando a venda cujo `_id` é `5bd761dcae323e45a93ccff4`:
```javascript
db.sales.findOne({ _id: ObjectId('5bd761dcae323e45a93ccff4') })
```

### Busca por `saleDate` (Data)
Buscando a venda que ocorreu exatamente na data especificada (usando a formatação nativa `ISODate`):
```javascript
db.sales.findOne({ saleDate: ISODate('2017-12-03T18:39:48.253Z') })
```

*Nota: Em ambos os casos acima, o terminal do mongosh retorna o documento completo contendo informações valiosas, como o array de objetos `items` comprados (mochila, cadernos, notebook), a localização da loja, método de pagamento e os dados do cliente.*

---

## 📊 Parte 2: Busca Dinâmica com o Operador `$in`

Quando queremos checar se o valor de um campo é igual a **pelo menos um** dos itens de uma lista de possibilidades que nós definimos, utilizamos o operador lógico especial `$in`. O método `find()` irá retornar *todos* os documentos que satisfizerem a condição.

### Busca Múltipla em `storeLocation`
O objetivo aqui é encontrar **todas as vendas** que aconteceram nas filiais de "London" **OU** "New York".
```javascript
db.sales.find({ storeLocation: { $in: ["London", "New York"] } })
```

**Saída no Terminal:**
Diferente do `findOne` que retorna apenas o primeiro objeto JSON direto, o `find()` associado ao `$in` processa e retorna múltiplos resultados (um Cursor). A tela é preenchida com as compras efetuadas nessas duas cidades. 

Quando o resultado é muito extenso, o terminal frequentemente pausa e mostra a notação:
> `Type "it" for more` 
Isso permite que você interaja ("it" de *iterate*) e avance a paginação de 20 em 20 registros para ver o resto.

---

## 💻 Arquivo de Comandos (Terminal)

Para facilitar a reprodução e manter o histórico dessas instruções de busca, salvei todas as queries na pasta atual sob o nome de **`find_queries.js`**. Você pode consultá-lo para lembrar as sintaxes num futuro projeto!

---

## ⚖️ Parte 3: Operadores de Comparação (Comparison Operators)

O MongoDB possui operadores integrados para comparar valores numéricos, datas e muito mais. Esses são os quatro operadores fundamentais que você deve decorar:

* **`$gt` (Greater Than - Maior que):** Busca valores *estritamente maiores* que o especificado.
  ```javascript
  // Encontra todas as vendas onde o preço de um item for maior que 50
  db.sales.find({ "items.price": { $gt: 50 } })
  ```

* **`$lt` (Less Than - Menor que):** Busca valores *estritamente menores* que o especificado.
  ```javascript
  // Encontra todas as vendas onde o preço de um item for menor que 50
  db.sales.find({ "items.price": { $lt: 50 } })
  ```

* **`$gte` (Greater Than or Equal - Maior ou Igual a):** Busca valores maiores *ou iguais* ao especificado.
  ```javascript
  // Encontra todas as vendas onde o cliente tiver 65 anos ou mais
  db.sales.find({ "customer.age": { $gte: 65 } })
  ```

* **`$lte` (Less Than or Equal - Menor ou Igual a):** Busca valores menores *ou iguais* ao especificado.
  ```javascript
  // Encontra todas as vendas onde o cliente tiver 65 anos ou menos
  db.sales.find({ "customer.age": { $lte: 65 } })
  ```
