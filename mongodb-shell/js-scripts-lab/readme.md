# Lab: JavaScript e Scripts Externos no MongoDB Shell

Nesta unidade, exploramos o poder do MongoDB Shell ser um ambiente baseado em Node.js (JavaScript). Demonstraremos como declarar funções em escopo global e como carregar e executar arquivos inteiros (scripts externos) diretamente pelo terminal do `mongosh`.

---

## 🚀 Parte 1: Executando Funções JavaScript (`randomMovie`)

O primeiro laboratório mostra como declarar uma *Arrow Function* que utiliza os métodos de agregação (Aggregation Framework) do MongoDB para trazer um resultado aleatório do banco de dados.

### Como funciona:
Ao colar o bloco de código abaixo no `mongosh`, você declara uma função no escopo global chamada `randomMovie`:
```javascript
const randomMovie = () =>
  db.movies.aggregate([{ $sample: { size: 1 } }]).toArray();
```
*(Nota: O shell não retorna nenhuma saída visível imediata ao declarar a função, o que é o comportamento esperado).*

### Execução e Saída:
Uma vez declarada, você a invoca chamando `randomMovie()`. O operador `$sample` do MongoDB vai sortear um documento da coleção `movies` e retornar no console.

Na sua execução, por exemplo, o filme sorteado foi **"Black Mask"** (ObjectId: `573a139af29313caabcefc4b`), contendo todo o seu objeto JSON detalhado.

---

## 📜 Parte 2: Carregando Scripts Externos (`load`)

O segundo laboratório ensina como não depender apenas de digitação manual no terminal, usando arquivos de código `.js` pré-programados para automatizar a inserção de múltiplos documentos de uma vez.

A missão era consertar o arquivo `connectAndInsert.js` fazendo:
1. A correta seleção de banco (`getSiblingDB`)
2. A exibição do resultado usando o comando nativo `print()`

### Solução (`connectAndInsert.js`)
As linhas corrigidas foram:
```javascript
// Substitui a definição vazia const db = {} por:
const db = db.getSiblingDB("sample_analytics");

// No final do arquivo, substituímos o TODO por:
printjson(result); // ou print(result)
```

### Como executar no mongosh
Em vez de colar o código inteiro, você manda o shell ler o arquivo do seu sistema operacional. No terminal do `mongosh`, você executa a função global `load()` passando o caminho do script.

```javascript
load("/lab/connectAndInsert.js")
```

**Saída Esperada no Terminal:**
Assim que carregado, o script é processado de cima para baixo. O `insertMany` grava as informações e a linha `printjson(result)` retorna as confirmações de inserção:

```javascript
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('63b747ac6caf50c84843089a'),
    '1': ObjectId('63b747ace9f9c5ae45e08781'),
    '2': ObjectId('63b747ac76f08d239c0a2120')
  }
}
true
```
