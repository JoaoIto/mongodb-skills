# MongoDB Aggregation

Bem-vindo ao módulo de Agregação no MongoDB! O framework de agregação é uma ferramenta poderosa para análise de dados, permitindo processar e resumir grandes quantidades de documentos através de um pipeline (fluxo de estágios).

## 📋 Sumário
* [Introdução ao MongoDB Aggregation](#introdução-ao-mongodb-aggregation)
* [Usando os Estágios $match e $group](#usando-os-estágios-match-e-group)
* [Usando os Estágios $sort e $limit](#usando-os-estágios-sort-e-limit)
* [Usando os Estágios $project, $count e $set](#usando-os-estágios-project-count-e-set)
* [Usando o Estágio $out](#usando-o-estágio-out)
* [Quizzes: MongoDB Aggregation](#-quizzes-mongodb-aggregation)
* [Lab: Aggregation com Node.js](./aggregation-lab/readme.md)

---

## Introdução ao MongoDB Aggregation

### Definições Chave
* **Aggregation (Agregação):** Coleta e resumo de dados.
* **Stage (Estágio):** Um dos métodos nativos que podem ser completados nos dados, mas que não alteram permanentemente os documentos originais no banco.
* **Aggregation Pipeline (Pipeline de Agregação):** Uma série de estágios executados sobre os dados em uma determinada ordem.

### Estrutura de um Aggregation Pipeline
Para executar uma agregação, usamos o comando `aggregate()` passando um array contendo os estágios:

```javascript
db.collection.aggregate([
    {
        $stage1: {
            { expression1 },
            { expression2 }...
        }
    },
    {
        $stage2: {
            { expression1 }...
        }
    }
])
```

## Usando os Estágios $match e $group

### $match
O estágio `$match` filtra os documentos para que apenas aqueles que correspondem às condições especificadas passem para o próximo estágio. A sintaxe é a mesma do `find()`.

```javascript
{
  $match: {
     "field_name": "value"
  }
}
```

### $group
O estágio `$group` agrupa os documentos recebidos por uma chave de agrupamento (group key).

```javascript
{
  $group:
    {
      _id: <expression>, // Chave de agrupamento
      <field>: { <accumulator> : <expression> }
    }
 }
```

### $match e $group em um Pipeline de Agregação
O pipeline a seguir encontra documentos com um campo chamado "state" igual a "CA" e, em seguida, agrupa esses documentos pela chave `$city` e mostra o número total de CEPs (zip codes) no estado da Califórnia.

```javascript
db.zips.aggregate([
  {   
     $match: { 
        state: "CA"
      }
  },
  {
     $group: {
        _id: "$city",
        totalZips: { $count : { } }
     }
  }
])
```

## Usando os Estágios $sort e $limit

### $sort
O estágio `$sort` classifica todos os documentos de entrada e os retorna para o pipeline em ordem classificada (ordenada). Usamos `1` para representar a ordem ascendente e `-1` para representar a ordem descendente.

```javascript
{
    $sort: {
        "field_name": 1
    }
}
```

### $limit
O estágio `$limit` retorna apenas um número especificado de registros (documentos).

```javascript
{
  $limit: 5
}
```

### $sort e $limit em um Pipeline de Agregação
O pipeline de agregação a seguir classifica os documentos em ordem descendente, de modo que os documentos com o maior valor de população (`pop`) apareçam primeiro, e limita a saída apenas aos cinco primeiros documentos após a classificação.

```javascript
db.zips.aggregate([
  {
    $sort: {
      pop: -1
    }
  },
  {
    $limit:  5
  }
])
```

## Usando os Estágios $project, $count e $set

### $project
O estágio `$project` especifica quais campos os documentos de saída terão. O valor `1` significa que o campo deve ser incluído, e `0` significa que o campo deve ser suprimido (ocultado). Os campos também podem receber um novo valor ou serem mapeados de variáveis antigas.

```javascript
{
    $project: {
        state: 1, 
        zip: 1,
        population: "$pop",
        _id: 0
    }
}
```

### $set
O estágio `$set` cria novos campos ou altera o valor de campos existentes, e então emite (dá output) os documentos com os novos campos mesclados àqueles que já existiam na estrutura.

```javascript
{
    $set: {
        place: {
            $concat: ["$city", ",", "$state"]
        },
        pop: 10000
     }
}
```

### $count
O estágio `$count` cria um **novo documento**, onde o número total de documentos que chegaram naquele estágio do pipeline é atribuído ao campo com o nome especificado. Note que ele retorna um único documento final.

```javascript
{
  $count: "total_zips"
}
```

## Usando o Estágio $out
O estágio `$out` pega os documentos resultantes do pipeline de agregação e os grava (salva) em uma coleção especificada. Este estágio **deve obrigatoriamente ser o último estágio** no pipeline.

Se você configurar o `$out` para gravar em uma coleção que já existe, **a coleção existente será completamente apagada e substituída** pelos novos documentos da agregação (Overwrite). Portanto, deve-se ter muita cautela com o nome especificado.

```javascript
db.zips.aggregate([
  { $match: { state: "NY" } },
  { $out: "ny_zips" } // Salva o resultado numa coleção chamada "ny_zips"
])
```

---

## 🧠 Quizzes: MongoDB Aggregation

### Pergunta 1
**Quais das seguintes tarefas NÃO podem ser completadas com um aggregation pipeline? (Selecione uma opção.)**

* [ ] **A.** Filtrar dados relevantes (Filtering for relevant pieces of data).
* [x] **B.** Buscar dados de fontes externas (Finding data from outside sources).
  > **Correto!** Você não pode usar agregação para encontrar dados de fontes externas. A agregação roda dentro do escopo do cluster do MongoDB.
* [ ] **C.** Agrupar documentos (Grouping documents).
* [ ] **D.** Calcular valores totais de um campo através de muitos documentos (Calculating total values).

### Pergunta 2
**Qual comando executa uma operação de agregação usando um aggregation pipeline? (Selecione uma opção.)**

* [ ] **A.** `group()`
* [ ] **B.** `filter()`
* [ ] **C.** `aggregation()`
* [x] **D.** `aggregate()`
  > **Correto!** A função `db.collection.aggregate()` é usada para executar um pipeline de agregação no MongoDB.

### Pergunta 3
**Na imagem fornecida, qual é o método de agregação utilizado?**

* [x] **Resposta:** O método selecionado na imagem é `db.collection.aggregate([...])`.

### Pergunta 4
**Dado o pipeline de agregação abaixo:**
```javascript
db.zips.aggregate([
  { $match: { "state": "CA" } },
  { $group: { "_id": "$zip" } }
])
```
**Qual será a saída desse pipeline? (Selecione uma opção.)**

* [ ] **A.** Um documento para cada cidade localizada na Califórnia (CA).
* [x] **B.** Um documento para cada código postal (zip code) localizado na Califórnia (CA).
  > **Correto!** Primeiro, o `$match` encontra todos os documentos com estado "CA". Depois, o `$group` agrupa por `$zip` (código postal). O resultado será um documento para cada valor único de código postal dentro daquele estado.

### Pergunta 5
**Dado o pipeline de agregação abaixo:**
```javascript
db.zips.aggregate([
  { $match: { "state": "TX" } },
  { $group: { "_id": "$city" } }
])
```
**Qual será a saída desse pipeline? (Selecione uma opção.)**

* [x] **A.** Um documento para cada cidade localizada no Texas (TX).
  > **Correto!** Primeiro filtra-se por estado = TX e em seguida agrupa-se pela chave de cidade (`$city`). Como o `_id` do `$group` dita a saída, haverá apenas uma entrada por cidade no Texas.
* [ ] **B.** Um documento contendo todas as cidades localizadas no Texas (TX).
* [ ] **C.** Um documento para cada estado nos EUA exceto o Texas (TX).
* [ ] **D.** Todos os documentos que contém uma cidade onde o estado é Texas (TX).

### Pergunta 6
**Dado o pipeline de agregação abaixo:**
```javascript
db.zips.aggregate([
  { $group: { "_id": "$pop" } },
  { $sort: { _id: -1 } }
])
```
**Qual será a saída desse pipeline? (Selecione uma opção.)**

* [ ] **A.** Um documento para a população de cada código postal, ordenado de forma aleatória.
* [ ] **B.** 10 documentos para a população de cada código postal.
* [x] **C.** Um documento para a população de cada código postal, ordenado de forma descendente.
  > **Correto!** O estágio `$group` gera um documento único por valor de população. Em seguida, o `$sort` recebe o documento, lendo pelo seu campo agrupado `_id` e ordenando de forma descendente (`-1`).
* [ ] **D.** Um documento para a população de cada código postal, ordenado de forma ascendente.

### Pergunta 7
**Dado o pipeline de agregação abaixo:**
```javascript
db.zips.aggregate([
  { $group: { "_id": "$pop" } },
  { $sort: { _id: -1 } },
  { $limit: 10 }
])
```
**Qual será a saída desse pipeline? (Selecione uma opção.)**

* [ ] **A.** Todos os documentos, cada um contendo a população de um código postal como _id, ordenados de forma ascendente.
* [ ] **B.** Todos os documentos, cada um contendo a população de um código postal como _id, ordenados de forma descendente.
* [x] **C.** 10 documentos, cada um contendo a população de um código postal como _id, ordenados por população de forma descendente.
  > **Correto!** A ordem do estágio de `$sort` é `-1`, o que significa ordenação descendente pela população. O estágio `$limit` restringe o número de documentos que são retornados para exatamente 10.
* [ ] **D.** 10 documentos, cada um contendo a população de um código postal como _id, ordenados por população de forma ascendente.

### Pergunta 8
**Qual é a principal diferença entre `$set` e `$project`? (Selecione uma opção.)**

* [ ] **A.** `$set` muda os valores dos campos. `$project` pode mostrar e esconder campos, mas não pode setar valores de campos.
* [ ] **B.** `$set` pode apenas criar novos campos, e `$project` pode apenas modificar campos existentes.
* [ ] **C.** `$project`, `$set` e `$addFields` são completamente intercambiáveis.
* [x] **D.** `$set` é usado para criar ou mudar valores de campos novos ou existentes. `$project` pode ser usado para criar ou mudar valores, mas também é usado para especificar quais campos mostrar (ocultar os demais) nos documentos dentro do pipeline.
  > **Correto!** Tanto o `$set` quanto o `$project` podem criar e atribuir valores a campos, mas **somente** o `$project` pode ser usado para remodelar agressivamente a estrutura do dado, ocultando nativamente tudo que não foi explicitamente listado como `1` (além da sintaxe especial para ocultar o `_id` com `0`).

### Pergunta 9
**O que o estágio `$count` retorna? (Selecione uma opção.)**

* [x] **A.** Um único documento com um campo que contém o valor definido como o número de documentos neste estágio no aggregation pipeline.
  > **Correto!** O estágio `$count` retorna exatamente um documento. O nome do campo será igual à string que você passou de parâmetro para ele, e o valor será a contagem dos documentos processados até aquele ponto.
* [ ] **B.** O número de grupos em um pipeline de agregação.
* [ ] **C.** Um número predefinido de documentos do aggregation pipeline.
* [ ] **D.** Um único documento que contém o número de campos que foram modificados em um pipeline de agregação.

### Pergunta 10
**O que o estágio `$out` faz? (Selecione uma opção.)**

* [ ] **A.** Remove documentos do aggregation pipeline.
* [ ] **B.** Retorna todos os documentos atualmente no pipeline como um único grande documento.
* [x] **C.** Cria uma nova coleção que contém os documentos neste estágio do aggregation pipeline.
  > **Correto!** O estágio `$out` emite os documentos diretamente para uma nova coleção no banco de dados.
* [ ] **D.** Remove o usuário atual que está rodando a agregação do banco de dados.

### Pergunta 11
**O que acontece se você definir o estágio `$out` para ter saída para uma coleção que já existe? (Selecione uma opção.)**

* [x] **A.** A coleção existente é apagada e substituída com os documentos da saída.
  > **Correto!** Usuários devem ser extremamente cuidadosos para não sobrescrever coleções acidentalmente ao especificar o nome do destino do `$out`.
* [ ] **B.** Uma segunda coleção com `"_1"` anexado ao nome é criada.
* [ ] **C.** Um novo banco de dados com o nome especificado da coleção é criado.
* [ ] **D.** Um erro é retornado, e a coleção existente não é modificada.

---

## 📚 Recursos de Estudo

Nesta unidade, você aprendeu como usar agregação no MongoDB, criar um pipeline de agregação e aplicar vários dos estágios de agregação mais comuns: `$match`, `$group`, `$sort`, `$limit`, `$project`, `$count`, `$set` e `$out`.

Use os seguintes recursos para aprender mais sobre inserção e consulta de documentos no MongoDB:

* **Lesson 01: Introduction to MongoDB Aggregation**
  * MongoDB Docs: Aggregation Operations
  * MongoDB Docs: Aggregation Pipelines
* **Lesson 02: Using $match and $group Stages in a MongoDB Aggregation Pipeline**
  * MongoDB Docs: $match
  * MongoDB Docs: $group
* **Lesson 03: Using $sort and $limit Stages in a MongoDB Aggregation Pipeline**
  * MongoDB Docs: $sort
  * MongoDB Docs: $limit
* **Lesson 04: Using $project, $count, and $set Stages in a MongoDB Aggregation Pipeline**
  * MongoDB Docs: $project
  * MongoDB Docs: $count
  * MongoDB Docs: $set
* **Lesson 05: Using $out Stage in a MongoDB Aggregation Pipeline**
  * MongoDB Docs: $out
