# Introduction to Atlas Search

Bem-vindo ao módulo de **Atlas Search**! Nesta unidade, você aprenderá como usar o Atlas Search para construir funcionalidades de busca (Full-Text Search) ricas para sua aplicação.

O Atlas Search utiliza o motor do **Apache Lucene** e roda através de um processo chamado `mongot`, operando nativamente ao lado do banco de dados (que roda no processo `mongod`).

## 📋 Sumário
* [Criando um Search Index](#criando-um-search-index)
* [Executando uma Busca ($search)](#executando-uma-busca-search)
* [Costumizando os Resultados](#costumizando-os-resultados)
* [Mapeamentos Dinâmicos vs Estáticos](#mapeamentos-dinâmicos-vs-estáticos)
* [Quizzes: Atlas Search Fundamentals](#-quizzes-atlas-search-fundamentals)

---

## Criando um Search Index

Antes de criar e rodar uma query com o Atlas Search, você **precisa criar um Atlas Search Index** nos campos que deseja pesquisar. Para isso, use `createSearchIndex()`.

Neste exemplo, usamos o método no shell do MongoDB para criar um índice apenas no campo `plot` (que é uma string).
```javascript
db.movies.createSearchIndex(
  "plotIndex",
   {
      "mappings": {
         "fields": {
            "plot": {
               "type": "string"
            }
         }
      }
   }
)
```

## Executando uma Busca ($search)

Para executar uma query de busca no Atlas, usamos o estágio de agregação `$search` no início de um pipeline. Aqui, usamos o `$search` aplicando o índice `plotIndex` criado anteriormente.
```javascript
db.movies.aggregate([
    {
      "$search": {
        "index": "plotIndex",
        "text": {
          "query": "space",
          "path": "plot"
        }
      }
    }
  ])
```

## Costumizando os Resultados

Para tornar a leitura mais fácil, adicionamos o `$limit` e o `$project`. No `$project`, usamos o operador `$meta: "searchScore"` para ver como a pontuação de relevância (score) de cada documento foi calculada na pesquisa.

```javascript
db.movies.aggregate([
  {
    "$search": {
      "index": "plotIndex",
      "text": {
        "query": "space",
        "path": "plot",
      },
    },
  },
  { "$limit": 3 },
  {
    "$project": {
      "_id": 0,
      "title": 1,
      "plot": 1,
      "score": { "$meta": "searchScore" },
    },
  },
]);
```

### Resumo dos Resultados ($searchMeta)
Para retornar apenas os metadados (como uma contagem/sumário) da busca, e não os documentos em si, use `$searchMeta` com o campo `count`:
```javascript
db.movies.aggregate([
    {
      "$searchMeta": {
        "index": "plotIndex",
        "text": {
          "query": "space",
          "path": "plot"
        },
        "count": {
          "type": "total"
        }
      }
    }
  ])
```

---

## Mapeamentos Dinâmicos vs Estáticos

* **Dynamic Mapping (`"dynamic": true`)**: Indexa TODOS os campos suportados dentro da coleção. Perfeito para quando o schema varia com o tempo ou não conhecemos a estrutura exata de antemão.
  ```javascript
  db.movies.createSearchIndex(
     { "mappings": { "dynamic": true } }
  )
  ```
* **Static Mapping (`"dynamic": false`)**: Especificamos explicitamente quais campos indexar. Excelente para economia de disco e performance, usado em campos com estrutura pré-definida e que não variam.

Você também pode misturar ambos no mesmo índice:
```javascript
db.movies.createSearchIndex(
    "plotReleasedIndex",
     {
        "mappings": {
          "dynamic": false, // Por padrão, tudo é estático.
           "fields": {
              "plot": { "type": "string" }, // Campo especifico indexado
              "released": {
                 "type": "embeddedDocument",
                 "dynamic": true // Campos DENTRO de 'released' viram dinâmicos
              }
           }
        }
     }
  )
```

---

## Tipos de Dados (Data Types)

Você pode atribuir tipos específicos para otimizar os campos no seu mapeamento estático.

### Atribuindo um Único Tipo
Para definir o tipo de um campo, use a propriedade `type` seguida pelo tipo suportado (ex: `string`, `date`, `number`).
```javascript
db.collection.createSearchIndex(
    "indexName",
     {
        "mappings": {
          "dynamic": false,
           "fields": {
              "fieldName": { "type": "string" }
           }
        }
     }
  )
```

### Documentos Embutidos (Subdocuments)
Para indexar um array de subdocumentos, use o tipo `embeddedDocuments`. Quando você usa esse tipo, pode tanto mapear de forma dinâmica (tudo dentro do objeto) ou de forma estática (campos específicos).
```javascript
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "meuCampoSubdoc": {
        "type": "embeddedDocuments",
        "dynamic": true // ou false
      }
    }
  }
}
```

### Atribuindo Múltiplos Tipos
Você também pode atribuir mais de um tipo a um único campo, passando um Array de objetos. Neste exemplo, o campo `directors` funcionará tanto para pesquisas em `string` (nomes) quanto via `objectId` (referência).
```javascript
db.movies.createSearchIndex(
    "directorsIndex",
     {
        "mappings": {
          "dynamic": false,
           "fields": {
              "directors": [
                { "type": "string" },
                { "type": "objectId" }
              ]
           }
        }
     }
  )
```

---

## Operadores de Busca ($search operators)

O Atlas Search fornece diversos operadores para refinar suas pesquisas:

### 1. `text` Operator
O operador `text` realiza uma busca textual completa (Full-Text Search).
```javascript
db.movies.aggregate([
    {
      "$search": {
        "index": "plotReleasedIndex",
        "text": {
          "query": "nature",
          "path": "plot"
        }
      }
    },
   { "$project": {"_id": 0, "title": 1, "plot": 1 }}
  ])
```

### 2. `equals` Operator
O operador `equals` retorna documentos onde o campo possui o valor exato. Ele **não funciona em valores string**. É ideal para datas, números ou booleanos.
```javascript
db.movies.aggregate([
   {
      "$search": {
         "index": "plotReleasedIndex",
         "equals": {
            "path": "released",
            "value": ISODate("1999-03-31T00:00:00.000Z")
         }
      }
   },
   { "$project": {"_id": 0, "title": 1, "released": 1 }}
])
```

### 3. `near` Operator
Busca por datas, números ou coordenadas que estejam mais próximas de um valor (`origin`). Ele retorna **todos** os documentos ordenados por proximidade. O `pivot` é a distância do centro onde o score cai pela metade (0.5); distâncias maiores retornam um score ainda menor (ex: 0.3).
```javascript
db.movies.aggregate([
   {
      "$search": {
         "index": "plotReleasedIndex",
         "near": {
            "path": "released",
            "origin": ISODate("1999-05-17T00:00:00.000+00:00"),
            "pivot": 2629746000 // Milissegundos (aprox 1 mês)
         }
      }
   },
   { "$project": { "_id": 0, "title": 1, "released": 1, "score": { "$meta": "searchScore" }}}
])
```

### 4. `range` Operator
Realiza buscas baseadas em um intervalo numérico ou de datas (`gt`, `lt`, `gte`, `lte`).
```javascript
db.movies.aggregate([
  {
    "$search": {
      "index": "plotReleasedIndex",
      "range": {
        "path": "released",
        "gt": ISODate("1994-01-01T00:00:00.000Z"),
        "lt": ISODate("1999-01-01T00:00:00.000Z")
      }
    }
  },
  { "$project": { "_id": 0, "title": 1, "released": 1 }}
])
```

---

## Criando Facetas (Search Facets)
Facetas categorizam os resultados da busca em "Buckets" (agrupamentos lógicos).

### Definindo um Search Index para Facetas
Para isso, os campos devem usar os tipos especiais: `stringFacet`, `numberFacet` ou `dateFacet`. (*O tipo `geoFacet` não é suportado*).
```javascript
db.movies.createSearchIndex(
    "genresFacetedIndex",
    {
      "mappings": {
        "dynamic": false,
        "fields": {
          "genres": {
            "type": "stringFacet" // Obrigatório para facetar as strings
          },
          "released": {
            "type": "date"
          }
        }
      }
    }
  )
```

### Usando o `$searchMeta` para Facetas
O agrupador `facet` roda dentro do metadado. Você provê o filtro raiz em `operator`, e como deseja "fatiar" o resultado em `facets`. Opcionalmente limite os buckets gerados com `numBuckets`.
```javascript
db.movies.aggregate([
    {
      "$searchMeta": {
        "index": "genresFacetedIndex",
        "facet": {
          "operator": { // A Query Primária
            "range": {
                "path": "released",
                "gte": ISODate("2000-01-01T00:00:00.000Z"),
                "lte": ISODate("2000-01-31T00:00:00.000Z")
              },
            },
          "facets": { // A categorização dos resultados
            "genresFacet": {
              "type": "string",
              "path": "genres",
              "numBuckets":  2 // Retorna os 2 gêneros mais populosos daquele mês
            }
          }
        }
      }
    }
  ])
```

---

## 🧠 Quizzes: Atlas Search Fundamentals

### Pergunta 1
**Qual dos seguintes processos é usado para gerenciar e executar o Atlas Search? (Selecione um)**
* [ ] **A.** `mongod`
* [x] **B.** `mongot`
  > **Correto!** O `mongot` é o processo separado que hospeda o motor de busca, constrói os índices Search e executa as queries. Ele roda num nó de busca dedicado paralelo ao `mongod` principal (que cuida do banco de dados).

### Pergunta 2
**Para criar e rodar uma query de Atlas Search nos seus dados, o que você deve fazer primeiro? (Selecione um)**
* [ ] **A.** Criar um text index.
* [ ] **B.** Criar um compound index.
* [ ] **C.** Nada, basta rodar o pipeline.
* [x] **D.** Criar um Atlas Search index.
  > **Correto!** Antes de usar o estágio `$search`, os seus dados não têm os nós e tokens extraídos, portando é obrigatório configurar um índice de pesquisa de texto com o `createSearchIndex()` primeiramente.

### Pergunta 3
**O trecho abaixo foi retirado de um índice de pesquisa. Qual tipo de mapeamento de campo ele utiliza?**
```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "common_name": [ { "type": "string" } ]
    }
  }
}
```
* [x] **A.** Static Mapping
* [ ] **B.** Dynamic Mapping
* [ ] **C.** Nenhum
  > **Correto!** Aqui a propriedade `dynamic` está setada como `false`, significando que é um mapeamento **estático**, ou seja, somente o campo `common_name` será indexado pelo Atlas Search.

### Pergunta 4
**Qual mapeamento de índice de busca você deve usar se quiser indexar absolutamente TODOS os campos da coleção? (Selecione um)**
* [ ] **A.** Static
* [x] **B.** Dynamic
  > **Correto!** O Dynamic Mappings (`"dynamic": true`) mapeia e indexa cada propriedade inserida que for de um tipo suportado pelo Atlas Search de forma automática.

### Pergunta 5
**Se você quer performar uma query de busca em um campo que possui um array de subdocumentos, qual tipo de dado você deve usar no seu índice de pesquisa? (Selecione um)**
* [x] **A.** `embeddedDocuments`
* [ ] **B.** `array`
* [ ] **C.** `document`
  > **Correto!** O tipo `embeddedDocuments` permite indexar campos que contém arrays de documentos, permitindo pesquisar em propriedades individuais dentro de cada documento do array. Nota: não existe o tipo `array` solto no Atlas Search.

### Pergunta 6
**Quais dos seguintes tipos de dados são suportados pelo Atlas Search? (Selecione todas que se aplicam)**
* [x] **A.** `date`
  > **Correto!** O Atlas Search suporta nativamente consultas e indexações para tipos `date`.

### Pergunta 7
**Você tem uma coleção de livros. Qual operador você deve usar para encontrar livros com a palavra "space" no campo `plot`? (Selecione um)**
* [ ] **A.** `equals`
* [x] **B.** `text`
  > **Correto!** O operador `text` serve para buscas "Full-Text Search" em valores String. O operador `equals` **não funciona** com valores do tipo String.

### Pergunta 8
**Qual operador você usaria para achar livros que foram lançados EXATAMENTE na data "1994-02-08T00:00:00"?**
* [ ] **A.** `text`
* [ ] **B.** `date`
* [x] **C.** `equals`
  > **Correto!** O `equals` checa exatamente se o valor de uma data (date), booleano ou número é idêntico ao que você especificou. O operador `date` não existe em si e o `text` é só para string.

### Pergunta 9
**O operador `near` retorna \_\_\_ documentos na coleção, ordenados por quão perto eles estão de um dado ponto.**
* [x] **A.** todos (all)
* [ ] **B.** igualados (matched)
* [ ] **C.** nenhum (no)
  > **Correto!** O `near` não elimina documentos, ele retorna **todos (all)** os documentos, mas ordenados pela relevância que decai à medida que a distância do `origin` aumenta.

### Pergunta 10
**Se um documento retornado tem um "score" de `0.3` quando foi usado o operador de busca `near`, qual a distância dele em relação à origem?**
* [x] **A.** O documento está além (beyond) do "pivot" providenciado.
  > **Correto!** O `pivot` é a distância exata em que o score cai pela metade (0.5). Como o score é 0.3 (menor que a metade), significa que o documento está fisicamente "além da distância" estipulada pelo pivot.

### Pergunta 11
**Quais tipos de campos podem ser usados para "faceting" (criação de facetas) quando você cria um índice de busca? (Selecione todos que se aplicam)**
* [x] **A.** `dateFacet`
* [ ] **B.** `geoFacet`
* [x] **C.** `stringFacet`
* [x] **D.** `numberFacet`
  > **Correto!** As três únicas formatações suportadas pelo Facet Index no Atlas Search são `dateFacet`, `stringFacet` e `numberFacet`. (`geoFacet` não é suportado).
