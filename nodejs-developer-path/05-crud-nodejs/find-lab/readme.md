# Lab: Querying Documents in Node.js

Este laboratório demonstra como realizar leituras/consultas (`find` e `findOne`) usando o driver oficial do MongoDB para Node.js.

## 💻 Estrutura do Lab

O arquivo [app.js](./app.js) ilustra dois métodos fundamentais:
1. `accountsCollection.find(documentsToFind)`: Retorna um *cursor*, que é iterado via `.forEach()` para exibir todos os resultados.
2. `accountsCollection.findOne(documentToFind)`: Busca e retorna um único documento em formato JSON utilizando a classe `ObjectId` do driver para construir a busca por ID.

## 🚀 Como executar o código base

1. **Instale as dependências** (se ainda não as tiver):
   ```bash
   npm install
   ```

2. **Atualize as Credenciais e IDs**:
   - Substitua a variável `uri` com as credenciais do seu cluster no MongoDB Atlas.
   - *(Opcional)* Se você estiver testando na sua coleção `bank.accounts` real, pode ser necessário substituir a string dentro de `new ObjectId("...")` por um ID que de fato exista no seu banco, caso contrário a busca de `findOne()` retornará `null`.

3. **Execute no terminal**:
   ```bash
   node app.js
   ```
