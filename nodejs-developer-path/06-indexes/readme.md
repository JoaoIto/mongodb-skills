# MongoDB Indexes

Bem-vindo ao módulo de Índices no MongoDB! Índices são estruturas de dados especiais que armazenam uma pequena porção do conjunto de dados da coleção de uma forma fácil de percorrer, melhorando significativamente a performance das consultas (queries).

## 📋 Sumário
* [Criando um Índice de Campo Único (Single Field Index)](#criando-um-índice-de-campo-único-single-field-index)
* [Criando um Índice Único (Unique Index)](#criando-um-índice-único-unique-index)
* [Entendendo os Índices Multichave (Multikey Indexes)](#entendendo-os-índices-multichave-multikey-indexes)
* [Trabalhando com Índices Compostos (Compound Indexes)](#trabalhando-com-índices-compostos-compound-indexes)
* [Deletando Índices (Deleting Indexes)](#deletando-índices-deleting-indexes)
* [Visualizando os Índices Usados em uma Coleção](#visualizando-os-índices-usados-em-uma-coleção)
* [Verificando se um Índice está Sendo Usado (Explain e Query Cover)](#verificando-se-um-índice-está-sendo-usado-explain-e-query-cover)
* [Quizzes: Working with MongoDB Indexes](#-quizzes-working-with-mongodb-indexes)
* [Lab: Criando e Gerenciando Índices no Node.js](./index-lab/readme.md)
* [Recursos de Estudo](#recursos-de-estudo)

---

## Criando um Índice de Campo Único (Single Field Index)
Revise o código abaixo, que demonstra como criar um índice de campo único em uma coleção usando o MongoDB Shell.

Use `createIndex()` para criar um novo índice em uma coleção. Dentro dos parênteses de `createIndex()`, inclua um objeto que contém o campo e a ordem de classificação (sort order). O valor `1` é para ordem ascendente e `-1` para descendente.

```javascript
db.customers.createIndex({
  birthdate: 1
})
```

## Criando um Índice Único (Unique Index)
Adicione `{unique: true}` como um segundo parâmetro, opcional, no `createIndex()` para forçar a exclusividade nos valores do campo indexado. Uma vez que o índice único é criado, quaisquer inserções ou atualizações que incluam valores duplicados na coleção para o(s) campo(s) do índice irão falhar.

```javascript
db.customers.createIndex({
  email: 1
},
{
  unique: true
})
```
> **Nota:** O MongoDB apenas cria o índice único se **não houver** duplicação nos valores do campo para os documentos já existentes.

## Entendendo os Índices Multichave (Multikey Indexes)
Revise o código abaixo, que demonstra como os índices multikey funcionam. Se um índice de campo único ou composto inclui um campo de array, então o índice é automaticamente um índice multikey.

Use `createIndex()` para criar um novo índice na coleção. O objeto passado como parâmetro deve conter o campo de array e a ordem de ordenação. Neste exemplo, `accounts` é um array dentro do documento.

```javascript
db.customers.createIndex({
  accounts: 1
})
```

## Trabalhando com Índices Compostos (Compound Indexes)
Revise o código abaixo, que demonstra como criar um índice composto em uma coleção.

Use `createIndex()` para criar um novo índice em uma coleção. O objeto fornecido contém dois ou mais campos e suas respectivas ordens.

```javascript
db.customers.createIndex({
  active: 1, 
  birthdate: -1,
  name: 1
})
```

### A Regra de Ouro da Ordem: ESR (Equality, Sort, Range)
A ordem dos campos importa muito ao criar o índice e a ordenação. É fortemente recomendado listar os campos na seguinte ordem (**ESR**):

1. **Equality (Igualdade):** campos que têm correspondência exata em um valor de consulta (`active: true`).
2. **Sort (Ordenação):** campos que ordenam os resultados em uma consulta (`sort({ birthdate: -1, name: 1 })`).
3. **Range (Intervalo):** campos filtrados por um intervalo de valores válidos (`$gte`, `$lt`, etc.).

**Exemplo de consulta perfeita para o índice acima:**
```javascript
db.customers.find({
  birthdate: { $gte: ISODate("1977-01-01") },
  active: true
}).sort({
  birthdate: -1, 
  name: 1
})
```
Esta consulta filtra por *Equality* (`active`), *Sort* (`birthdate`, `name`) e *Range* (`birthdate`).

## Deletando Índices (Deleting Indexes)
Para visualizar os índices atuais, use `getIndexes()`. Lembre-se de que o MongoDB cria um índice padrão no campo `_id` que é usado internamente e **não pode ser deletado**.

Para excluir um índice, use `dropIndex()` passando o nome da chave ou um objeto representando a estrutura.

**Deletando por nome:**
```javascript
db.customers.dropIndex('active_1_birthdate_-1_name_1')
```

**Deletando por chave estrutural:**
```javascript
db.customers.dropIndex({
  active: 1,
  birthdate: -1, 
  name: 1
})
```

**Deletando TODOS os índices definidos pelo usuário:**
O comando `dropIndexes()` apagará todos os índices extras criados na coleção, preservando o `_id`. Ele também aceita um array de nomes se você quiser limpar uma lista específica.
```javascript
db.customers.dropIndexes()
// ou especificando
db.customers.dropIndexes(['index1name', 'index2name'])
```

## Visualizando os Índices Usados em uma Coleção
Use `getIndexes()` para ver todos os índices criados em uma coleção.

```javascript
db.customers.getIndexes()
```

## Verificando se um Índice está Sendo Usado (Explain)
Use `explain()` em uma coleção ao executar uma consulta para ver o plano de execução (*Execution plan*). Este plano fornece os detalhes das etapas de execução (como `IXSCAN`, `COLLSCAN`, `FETCH`, `SORT`, etc.).

* O estágio **`IXSCAN`** indica que a consulta está usando um índice e qual índice está sendo selecionado.
* O estágio **`COLLSCAN`** indica que uma varredura de coleção (*collection scan*) está sendo executada, o que significa que nenhum índice está sendo usado (o banco lê todos os documentos um a um).
* O estágio **`FETCH`** indica que documentos reais estão sendo lidos da coleção a partir das referências do índice.
* O estágio **`SORT`** indica que os documentos estão sendo ordenados na memória.

**Exemplo de explain() em uma busca:**
```javascript
db.customers.explain().find({
  birthdate: {
    $gt: ISODate("1995-08-01")
  }
})
```

**Exemplo de explain() em busca e ordenação:**
```javascript
db.customers.explain().find({
  birthdate: {
    $gt: ISODate("1995-08-01")
  }
}).sort({
  email: 1
})
```

### Cover a query by the Index (Índice Cobre a Consulta)
Um Índice *cobre* uma consulta (Covered Query) quando o MongoDB não precisa buscar os documentos da memória/disco, já que todos os dados solicitados pela query já existem e são retornados diretamente de dentro do próprio índice.

Ao adicionar projeções (`{ name: 1, birthdate: 1, _id: 0 }`), forçamos o MongoDB a devolver apenas esses campos. Se eles já fazem parte da chave do Índice Composto, ganhamos o status de `PROJECTION_COVERED`.

```javascript
db.customers.explain().find(
  {
    birthdate: { $gte: ISODate("1977-01-01") },
    active: true
  },
  {
    name: 1,
    birthdate: 1, 
    _id: 0
  }
).sort({
  birthdate: -1,
  name: 1
})
```
O estágio `PROJECTION_COVERED` mostra que toda a informação necessária foi retornada pelo índice, sem precisar fazer a leitura completa dos documentos na coleção (`FETCH`).

---

## 🧠 Quizzes: Working with MongoDB Indexes

### Pergunta 1
**Quais das seguintes afirmações sobre índices estão corretas? (Selecione todas que se aplicam.)**

* [x] **A.** Índices são estruturas de dados que melhoram a performance, suportam correspondências exatas eficientes e operações de query baseadas em intervalos, e podem retornar resultados ordenados.
  > **Correto!** Os índices atingem isso permitindo que o MongoDB realize apenas o trabalho necessário para retornar os dados solicitados, em vez de escanear a coleção inteira.
* [ ] **B.** Índices são automaticamente criados baseados nos padrões de uso.
  > **Incorreto.** Embora os usuários possam criar índices nos dados mais usados para melhorar a performance de consultas lentas, eles não são criados automaticamente por padrões de uso. No entanto, o MongoDB Atlas fornece recomendações sobre quais índices criar ou apagar.
* [x] **C.** Índices são usados para tornar as consultas mais rápidas para os usuários. Uma das formas mais fáceis de melhorar a performance de uma query lenta é criar índices nos dados que são mais frequentemente usados.
  > **Correto!** Os índices ajudam a tornar as consultas mais rápidas para os usuários escaneando apenas os índices para encontrar os dados solicitados.
* [ ] **D.** Quando usando um índice, o MongoDB lê cada documento em uma coleção para checar se ele corresponde à query sendo rodada.
  > **Incorreto.** Quando há índices disponíveis, o MongoDB não precisa escanear a coleção inteira. Em vez disso, ele escaneará apenas os índices para encontrar os dados solicitados.

### Pergunta 2
**Qual das seguintes afirmações sobre índices é verdadeira? (Selecione uma opção.)**

* [ ] **A.** Índices melhoram a performance de queries e não têm nenhum impacto na performance de escrita.
  > **Incorreto.** Índices vêm com um custo, incluindo atualizações a cada operação de escrita.
* [x] **B.** Índices melhoram a performance de queries em detrimento (ao custo) da performance de escrita.
  > **Correto!** Índices melhoram consultas ao custo da escrita. Para a maioria dos casos de uso, essa compensação (*tradeoff*) é aceitável. Índices devem ser usados em dados frequentemente consultados, ou em consultas infrequentes, mas que são altamente custosas em recursos computacionais.
* [ ] **C.** Índices não têm nenhum impacto na performance de queries, mas melhoram a performance de escrita.
  > **Incorreto.** A função deles é o inverso. Eles ajudam a acelerar a leitura e penalizam a escrita.
* [ ] **D.** Índices têm um impacto negativo na performance de queries, mas melhoram a performance de escrita.
  > **Incorreto.** A função primária de um índice é ter um impacto positivo nas consultas (queries).

### Pergunta 3 (Correspondência)
**Selecione as correspondências corretas (Drag and Drop / Match):**

* **Multikey index (Índice Multichave)**
  > *Definição Correta:* Um índice multikey é um índice sobre um campo de array. Cada elemento no array ganha uma chave de índice, o que suporta uma consulta eficiente contra campos de arrays. Tanto os índices de campo único quanto os compostos podem ter um campo de array, existindo assim índices multikey de campo único e índices multikey compostos.
* **Compound index (Índice Composto)**
  > *Definição Correta:* O MongoDB suporta índices compostos, onde uma única estrutura de índice guarda referências de múltiplos campos nos documentos de uma coleção. Um índice composto é criado especificando os campos que o índice deve referenciar, seguidos da ordem de ordenação para cada campo.
* **Single field index (Índice de Campo Único)**
  > *Definição Correta:* Um índice de campo único é um índice em apenas um campo do documento. O MongoDB cria um índice de campo único nativo no campo `_id` por padrão, mas índices adicionais podem ser necessários em outros campos também. Um índice de campo único pode também ser "multikey" se operar em um campo que é um array.

### Pergunta 4
**O que é um índice de campo único (Single Field Index)? (Selecione uma opção.)**

* [x] **A.** Um índice que suporta consultas eficientes contra um campo.
  > **Correto!** Um índice de campo único (*single field index*) suporta consultas eficientes contra um único campo. Por padrão, todas as coleções possuem um no campo `_id`, mas os usuários podem definir índices adicionais. Ele também atua como um índice multikey se o valor desse campo for um array.
* [ ] **B.** Um índice que suporta consultas eficientes contra múltiplos campos.
  > **Incorreto.** Isso descreve um Índice Composto (*Compound Index*).
* [ ] **C.** Um índice que apenas suporta consultas eficientes contra campos com valores escalares.
  > **Incorreto.** Índices de campo único também suportam consultas contra um array (tornando-se multikey).
* [ ] **D.** Um índice que suporta consultas eficientes contra campos que já estão indexados por outro índice definido pelo usuário.
  > **Incorreto.** Se um campo já faz parte de um índice (como um composto), criar um índice único adicional pode causar sobre-indexação e problemas de performance.

### Pergunta 5
**Você cria um índice único no campo `email`, com a restrição `unique` definida como `true`:**
`db.customers.createIndex({email:1}, {unique:true})`
**O que aconteceria se você tentasse inserir um novo documento com um email que já existe na coleção? (Selecione uma opção.)**

* [ ] **A.** O novo documento será inserido e substituirá o documento antigo.
  > **Incorreto.** A restrição de unicidade (*unique constraint*) não substitui valores; ela apenas previne a duplicação.
* [ ] **B.** O novo documento será inserido e o documento antigo permanecerá.
  > **Incorreto.** Isso violaria a regra de índice único.
* [ ] **C.** O MongoDB retornará um erro de chave duplicada (duplicate key error), e o documento será inserido.
  > **Incorreto.** Se um erro é retornado, a operação não é concluída.
* [x] **D.** O MongoDB retornará um erro de chave duplicada (duplicate key error), e o documento não será inserido.
  > **Correto!** Índices únicos garantem que os campos indexados não armazenem valores duplicados. Neste exemplo, o banco recusa a transação e protege a integridade dos dados retornando o erro.

### Pergunta 6
**O que é um índice multikey (Multikey Index)? (Selecione uma opção.)**

* [ ] **A.** Um índice em apenas um campo onde o campo não é um array.
  > **Incorreto.** Isso descreve um Índice de Campo Único clássico.
* [x] **B.** Um índice onde um dos campos indexados contém um array.
  > **Correto!** Índices multikey suportam consultas eficientes contra campos de array criando uma chave de índice para cada elemento. Isso permite que o MongoDB busque pela chave de índice de cada elemento sem precisar ler todo o array, resultando em grandes ganhos de performance.
* [ ] **C.** Um índice em mais de um campo onde nenhum dos campos é array.
  > **Incorreto.** Isso descreve um Índice Composto escalar.
* [ ] **D.** Um índice em mais de um campo onde múltiplos campos são arrays.
  > **Incorreto.** O MongoDB permite apenas um único campo de array por índice (mesmo em um índice composto).

### Pergunta 7
**Qual é o número máximo de campos de array permitidos por índice multikey? (Selecione uma opção.)**

* [x] **A.** 1
  > **Correto!** Se você criar um índice composto contendo vários campos, no máximo um desses campos pode conter um array. Isso ocorre para evitar a explosão combinatória das chaves de índice geradas.
* [ ] **B.** 3
  > **Incorreto.**
* [ ] **C.** 5
  > **Incorreto.**
* [ ] **D.** Unlimited
  > **Incorreto.**

### Pergunta 8
**O que é um índice composto (Compound Index)? (Selecione uma opção.)**

* [ ] **A.** Um índice que suporta consultas combinando o nome do campo e o valor numa única string.
* [ ] **B.** Um índice que suporta consultas contra campos arbitrários ou desconhecidos.
* [x] **C.** Um índice que contém referências a múltiplos campos dentro de um documento.
  > **Correto!** O índice composto agrega múltiplas propriedades num único índice, melhorando buscas baseadas em múltiplos critérios.
* [ ] **D.** Um índice que suporta consultas executadas em duas coleções ao mesmo tempo.

### Pergunta 9
**Qual é a ordem recomendada de campos em um índice composto? (Selecione uma opção.)**

* [ ] **A.** Sort, Range, Equality
* [ ] **B.** Range, Sort, Equality
* [x] **C.** Equality, Sort, Range
  > **Correto!** Conhecida como Regra ESR. Primeiro, usa-se a igualdade (Equality) para determinar quais documentos batem perfeitamente. O segundo (Sort) é usado para definir a ordem dos documentos na memória. O terceiro (Range) filtra os resultados ordenados com base num intervalo.
* [ ] **D.** A ordem dos campos indexados não é importante.

### Pergunta 10
**Você tem um índice no campo `email`. Antes de deletá-lo, você deseja avaliar o impacto da remoção desse índice na performance de uma consulta. Para fazer isso, qual comando você deve usar? (Selecione uma opção.)**

* [ ] **A.** `dropIndex()`
* [ ] **B.** `dropIndexes()`
* [ ] **C.** `getIndexes()`
* [x] **D.** `hideIndex()`
  > **Correto!** `hideIndex()` permite que você "esconda" o índice temporariamente do planejador de consultas (*Query Planner*). Dessa forma, você pode analisar se as queries ficam mais lentas sem ele, e só então usar `dropIndex()` para deletar de vez.

---

## Recursos de Estudo
* **Lesson 1 - Using MongoDB Indexes in Collections**
  * MongoDB Docs: [Indexes](https://www.mongodb.com/docs/manual/indexes/)
  * MongoDB Docs: [Indexes Reference](https://www.mongodb.com/docs/manual/reference/indexes/)
* **Lesson 2 - Creating a Single Field Index in MongoDB**
  * MongoDB Docs: [createIndex()](https://www.mongodb.com/docs/manual/reference/method/db.collection.createIndex/)
  * MongoDB Docs: [Unique Indexes](https://www.mongodb.com/docs/manual/core/index-unique/)
  * MongoDB Docs: [Measure Index Use](https://www.mongodb.com/docs/manual/tutorial/measure-index-use/)
  * MongoDB Docs: [getIndexes()](https://www.mongodb.com/docs/manual/reference/method/db.collection.getIndexes/)
* **Lesson 3 - Creating a Multikey Index in MongoDB**
  * MongoDB Docs: [Multikey Indexes](https://www.mongodb.com/docs/manual/core/index-multikey/)
* **Lesson 4 - Working with Compound Indexes in MongoDB**
  * MongoDB Docs: [Compound Indexes](https://www.mongodb.com/docs/manual/core/index-compound/)
  * MongoDB Docs: [Indexing Strategies](https://www.mongodb.com/docs/manual/applications/indexes/)
* **Lesson 5 - Deleting MongoDB Indexes**
  * MongoDB Docs: [dropIndex()](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndex/)
  * MongoDB Docs: [dropIndexes()](https://www.mongodb.com/docs/manual/reference/method/db.collection.dropIndexes/)
