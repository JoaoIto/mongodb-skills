# Lab: Transações Multi-Documento em Node.js

Este laboratório demonstra como executar e efetivar transações ACID no MongoDB utilizando o driver Node.js para garantir que blocos de operação ocorram de forma totalmente atômica ("Tudo ou Nada").

## O Cenário
A cliente *Donna Wood* quer abrir uma conta Poupança (*savings*) na instituição. Ela deseja abrir a conta e transferir de imediato $200 oriundos da conta Corrente (*checking*) atual dela.

Para garantir as regras ACID e integridade bancária, precisamos:
1. Inserir um documento inteiro (`insertOne`) na coleção representando a nova conta savings.
2. Diminuir $200 usando matemática de atualização (`$inc: -200`) via `updateOne` da conta checking original.

Essas duas operações (Inserção e Atualização) mexem em documentos distintos, por isso não são atômicas sozinhas. A solução é passar o objeto `{ session }` no fim de ambas as chamadas para atrelar a transação e encapsulá-las entre um `.startTransaction()` e um `.commitTransaction()`.

## Como Executar
1. Instale o driver do mongodb:
   ```bash
   npm install
   ```

2. Insira a sua *Connection String* no código do `app.js`. 
> **Atenção:** Transações Multi-Documento exigem suporte nativo a transações, o que só funciona em *Replica Sets* ou *Sharded Clusters* (como o seu MongoDB Atlas na nuvem), e **NÃO** funcionarão se você estiver testando em um MongoDB Standalone rodando num simples localhost não configurado.

3. Execute a aplicação no terminal:
   ```bash
   node app.js
   ```
