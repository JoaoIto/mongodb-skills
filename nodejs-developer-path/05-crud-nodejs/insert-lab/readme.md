# Lab: Inserting Documents in Node.js

Este laboratório demonstra como inserir documentos únicos e múltiplos usando o driver oficial do MongoDB para Node.js, colocando em prática os conceitos de `insertOne` e `insertMany`.

## 💻 Estrutura do Lab

A aplicação de base foi consolidada no arquivo `app.js`. Ela estabelece uma conexão com o MongoDB Atlas e insere dados falsos na coleção `accounts` dentro do banco de dados `bank`.

O código inclui exemplos sequenciais de:
1. `accountsCollection.insertOne(sampleAccount)`
2. `accountsCollection.insertMany(sampleAccounts)`

### Arquivo Base
Você pode encontrar o script desenvolvido no arquivo [app.js](./app.js).

---

## 🚀 Como executar o código base

1. **Instale as dependências** (caso a pasta `node_modules` não exista, rodamos os comandos iniciais):
   ```bash
   npm install
   ```

2. **Atualize as Credenciais**:
   Abra o arquivo `app.js` e substitua a variável `uri` pela String de Conexão real do seu cluster no MongoDB Atlas (substituindo `<user>`, `<password>` e `<cluster>`).

3. **Execute o código no terminal**:
   ```bash
   node app.js
   ```

Ao ser executado, a aplicação se conectará ao cluster, fará as inserções dos dados definidos nos arrays do script, exibirá o `insertedId` de cada um deles via console e finalizará a conexão com segurança (`client.close()`).
