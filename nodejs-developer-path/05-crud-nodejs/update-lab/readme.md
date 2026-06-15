# Lab: Updating Documents in Node.js

Este laboratório demonstra como realizar modificações (`updateOne` e `updateMany`) em dados existentes no MongoDB utilizando o driver oficial para Node.js.

## 💻 Estrutura do Lab

O arquivo [app.js](./app.js) ilustra dois métodos de alteração de documentos:
1. `accountsCollection.updateOne`: Aplica o operador `$inc` para incrementar o valor numérico de um saldo bancário. Você precisa ter certeza que o ID fornecido no script existe em seu banco de dados para o log acusar sucesso.
2. `accountsCollection.updateMany`: Usa o operador `$push` para adicionar uma nova transferência na array (lista) de registros em todas as contas do tipo `checking`.

## 🚀 Como executar o código base

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Atualize as Credenciais e IDs**:
   - Abra o `app.js` e troque a variável `uri` com a sua *Connection String* do Atlas.
   - Para que o `updateOne` funcione, confira no seu Atlas um `_id` de uma conta existente e o insira em `new ObjectId("SUA_STRING_DE_ID_AQUI")`.

3. **Execute no terminal**:
   ```bash
   node app.js
   ```
