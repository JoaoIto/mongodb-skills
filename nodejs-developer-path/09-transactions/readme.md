# MongoDB Transactions (ACID)

Bem-vindo ao módulo de **Transactions**! No MongoDB, as transações ACID (Atomicidade, Consistência, Isolamento, Durabilidade) são usadas quando precisamos garantir que um bloco inteiro de operações aconteça junto (Tudo ou Nada), muito comuns em aplicações bancárias ou e-commerces.

## 📋 Sumário
* [Introdução a Transações Multi-Documento](#introdução-a-transações-multi-documento)
* [Commit e Abort via Shell](#commit-e-abort-via-shell)
* [Quizzes: ACID Transactions](#-quizzes-acid-transactions)

---

## Introdução a Transações Multi-Documento
O MongoDB é naturalmente atômico a nível de **um único documento**. Ou seja, ao atualizar um documento com várias propriedades ou arrays, aquela operação isolada já possui garantia atômica nativa.

Entretanto, transações ACID são estritamente necessárias quando os valores precisam ser trocados entre *partes diferentes* (operações multi-documento). Se um documento (Conta A) transfere dinheiro para outro documento (Conta B), e a energia acaba no meio do caminho, você não quer que a Conta A perca o dinheiro sem a Conta B recebê-lo. É para esse tipo de cenário (onde `updateMany` ou operações em múltiplas collections não são inerentemente atômicas) que usamos as Sessões e as Transações.

---

## Commit e Abort via Shell

Na maior parte das aplicações você fará isso através do *Driver Node.js*. Contudo, para se familiarizar com a mecânica dos blocos, veja como iniciamos, confirmamos ou abortamos transações diretamente no MongoDB Shell.

### Commit de uma Transação (Salvando as alterações)
Quando tudo ocorre bem e queremos materializar as mudanças:
```javascript
// 1. Iniciar a Sessão
const session = db.getMongo().startSession()

// 2. Abrir o bloco de Transação
session.startTransaction()

// 3. Resgatar a Collection usando a Sessão
const account = session.getDatabase('<add database name here>').getCollection('<add collection name here>')

// Adicionar operações de banco (ex: account.updateOne(...)) 

// 4. Efetivar as operações de uma vez só!
session.commitTransaction()
```

### Abortando uma Transação (Rollback)
Se você se encontrar num cenário que requeira o *rollback* (desfazer as operações) antes da transação ser concluída, você pode abortá-la. Isso deixará o banco de dados do jeito que estava antes do início do bloco.

```javascript
// 1. Iniciar a Sessão
const session = db.getMongo().startSession()

// 2. Abrir o bloco de Transação
session.startTransaction()

// 3. Resgatar a Collection usando a Sessão
const account = session.getDatabase('<add database name here>').getCollection('<add collection name here>')

// Adicionar operações de banco (ex: account.updateOne(...)) 

// 4. Cancelar e descartar todas as operações!
session.abortTransaction()
```

---

## 🧠 Quizzes: ACID Transactions

### Pergunta 1
**Relacione as letras correspondentes de ACID com suas definições corretas.**
* **A - Atomicity (Atomicidade):** Garante que toda transação é "tudo ou nada" ao submeter dados ao banco de dados. Ex: não queremos que o dinheiro seja tirado de uma conta, mas não seja adicionado a outra.
* **C - Consistency (Consistência):** Garante que os dados gravados no banco de dados sejam consistentes com as restrições do banco. Ex: Se um saldo não pode ser menor que 0, a transação falharia antes de violar a regra.
* **I - Isolation (Isolamento):** Garante que toda transação rodando em concorrência deixe o banco no mesmo estado que se rodassem sequencialmente. Múltiplas transações podem ocorrer simultaneamente sem se afetarem.
* **D - Durability (Durabilidade):** Garante que os dados nunca são perdidos. Dados são salvos em memória não-volátil persistindo até mesmo em apagões de hardware/energia.

### Pergunta 2
**Qual das alternativas a seguir é a melhor definição de uma transação ACID? (Selecione uma opção)**
* [ ] **A.** Um grupo de operações de banco de dados que não pode falhar.
* [ ] **B.** Operações de banco que envolvem transferir dinheiro entre duas partes.
* [x] **C.** Um grupo de operações de banco de dados que deve acontecer totalmente em conjunto, ou não deve acontecer em absoluto. ("All or Nothing").

### Pergunta 3
**Quais dos cenários abaixo exigem o uso de uma transação ACID? (Selecione todas que se aplicam)**
* [x] **A.** Atualizar um banco de dados bancário para refletir a transferência de dinheiro do Cliente A para a conta bancária do Cliente B.
* [x] **B.** Atualizar estoques e registros de carrinho de compras quando um cliente adiciona um item em um app de e-commerce.

### Pergunta 4
**Quais das seguintes afirmações sobre transações Multi-Documento no MongoDB são VERDADEIRAS? (Selecione todas que se aplicam)**
* [x] **A.** Operações de banco que afetam mais de um documento (como `.updateMany()`) não são inerentemente atômicas no MongoDB e devem ser completadas usando uma multi-document transaction para obter as propriedades ACID.
* [x] **B.** Transações Multi-Documento devem ser tratadas como uma ferramenta cirúrgica (precisa) usada apenas em determinados cenários, pois incorrem em custos de performance.
* [x] **C.** Usar uma multi-document transaction garante que o banco terminará em um estado consistente após rodar as operações sobre múltiplos documentos.

### Pergunta 5
**A Nadia precisa atualizar saldos de contas através de várias coleções no MongoDB. É importante que as operações sigam as propriedades ACID. A Nadia deveria usar transações neste cenário? (Selecione uma)**
* [ ] **A.** Ela NÃO precisa usar transações, porque as operações multi-documento já são inerentemente atômicas no MongoDB.
* [x] **B.** A Nadia PRECISA sim usar uma transação, pois as operações multi-documento NÃO são inerentemente atômicas no MongoDB (o mongodb só é atômico a nível de único documento).

### Pergunta 6
**Você está criando uma transação que faz o seguinte: Insere uma nova conta 'savings' (poupança) para um cliente existente e financia essa nova conta tirando $200 da conta 'checking' dele. Qual método você deve usar para completar essa transação? (Selecione uma)**
* [ ] **A.** `endTransaction()`
* [x] **B.** `commitTransaction()`
  > **Correto!** Nós usamos `.commitTransaction()` para efetivar uma transação com sucesso. O `session.commitTransaction()` deve ser colocado ao final do bloco transacional.

### Pergunta 7
**Qual dos comandos abaixo emitirá um output no shell se for executado com sucesso? (Selecione uma)**
* [ ] **A.** `.startTransaction()`
* [x] **B.** `.commitTransaction()`
  > **Correto!** Se for um sucesso, o `.commitTransaction()` retornará uma mensagem de status no shell contendo os tempos do cluster (`clusterTime`, `ok: 1`). O `.startTransaction()` é silencioso e não emite nada.

---

## 📚 Recursos de Estudo

Nesta unidade, você aprendeu que transações ACID garantem que operações de banco de dados (como transferir fundos de uma conta para outra) aconteçam totalmente em conjunto ou não aconteçam em absoluto. Você explorou também como as transações funcionam no modelo de documentos e como criar/cancelar transações multi-documentos via `startTransaction()`, `commitTransaction()` e `abortTransaction()`.

Use os seguintes recursos para aprender mais sobre Transações ACID no MongoDB:

* **What are ACID transactions?**
  * MongoDB Guide: [ACID Transactions](https://www.mongodb.com/basics/acid-transactions)
* **How do ACID transactions work in MongoDB?**
  * MongoDB Docs: [Transactions in MongoDB](https://www.mongodb.com/docs/manual/core/transactions/)
