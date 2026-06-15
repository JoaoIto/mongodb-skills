# Lab: Inserting Documents in a MongoDB Collection

Neste laboratório prático, utilizamos o MongoDB Shell para realizar a inserção e validação de um novo documento de transação/conta. As imagens de resolução acompanham as queries efetuadas no banco de dados.

## 📥 Instruções e Execução

### 1. Inserindo o Documento (`insertOne`)
A instrução pede a inserção de uma nova conta na coleção de `accounts`. No `mongosh`, executamos o comando `insertOne` passando os dados exigidos e atualizando a flag de edição chamando um objeto nativo `new Date()`.

**Comando Executado:**
```javascript
db.accounts.insertOne({
  "account_id": 111333,
  "limit": 12000,
  "products": [
    "Commodity",
    "Brokerage"
  ],
  "last_updated": new Date()
})
```

**Saída Esperada:**
O terminal confirmará a inserção retornando `acknowledged: true` e gerando um ObjectId único (hash hexadecimal) para essa nova conta.
```javascript
{
  acknowledged: true,
  insertedId: ObjectId('6a2c1085257ae3f59e8ce5b0')
}
```

### 2. Validando a Inserção (`findOne`)
Para comprovar que os dados foram inseridos corretamente e refletem o que mandamos, utilizamos o método `findOne` passando como filtro de busca o `account_id` recém inserido.

**Comando Executado:**
```javascript
db.accounts.findOne({ account_id: 111333 })
```

**Saída Esperada:**
O terminal vai imprimir o objeto inteiro que salvamos. Uma coisa interessante de notar é que a data, que enviamos instanciando a classe `new Date()`, foi traduzida e guardada nativamente no formato `ISODate`.
```javascript
{
  _id: ObjectId('6a2c1085257ae3f59e8ce5b0'),
  account_id: 111333,
  limit: 12000,
  products: [ 'Commodity', 'Brokerage' ],
  last_updated: ISODate('2026-06-12T13:58:29.458Z')
}
```

---

## 💻 Arquivo de Comandos (Terminal)

Para rodar essa instrução completa ou consultar a sintaxe da consulta diretamente, você pode acessar o script **`insert_account.js`** localizado nesta mesma pasta.
