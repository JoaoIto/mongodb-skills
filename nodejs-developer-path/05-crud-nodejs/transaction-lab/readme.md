# Lab Especial: MongoDB Transactions in Node.js

Este laboratório foca na criação de transações multi-documento (ACID) usando o driver MongoDB para Node.js.
Transações garantem que todas as operações dentro do bloco sejam concluídas com sucesso. Se uma delas falhar, todo o bloco sofre *rollback* (desfeito).

> **Atenção:** Transações no MongoDB exigem um cluster rodando com *Replica Set* (o que o Atlas já provê nativamente).

## 💻 Estrutura do Lab

No [app.js](./app.js) fornecido, a lógica estabelece:
1. `client.startSession()` para iniciar a sessão do banco.
2. `session.withTransaction()` que envelopa múltiplas operações.
3. Repasse da `{ session }` em todas as operações (`updateOne`, `insertOne`), garantindo que elas façam parte da mesma transação.
4. Múltiplos updates entre duas contas (`sender` e `receiver`) simulando uma transferência de valor monetário e criação do registro dessa transferência simultaneamente.

## 🚀 Como executar o código base

1. **Instale as dependências** (se já não estiverem instaladas):
   ```bash
   npm install
   ```

2. **Atualize as Credenciais**:
   - Abra `app.js` e troque a variável `uri` com sua URI do MongoDB Atlas.
   - (Opcional) Modifique as variáveis de ID de contas (`MDB574189300` e `MDB343652528`) caso queira rodar em contas reais da sua coleção.

3. **Execute no terminal**:
   ```bash
   node app.js
   ```
