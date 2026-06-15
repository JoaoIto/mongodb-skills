# MongoDB CRUD Operations in Node.js

Bem-vindo ao módulo de Operações CRUD programáticas! Até agora, você realizou buscas e inserções interagindo diretamente com o `mongosh` (MongoDB Shell). Nesta unidade, damos um passo adiante e passamos a controlar o banco de dados diretamente de dentro de uma aplicação Node.js.

## 🚀 Como o Node.js interage com o MongoDB?

Antes de começarmos a inserir ou buscar documentos, é importante entender os três pilares do desenvolvimento Node.js com o MongoDB:

1. **O Driver Oficial (`mongodb`)**: O Node.js não se comunica nativamente com o banco de dados. Nós usamos um "Driver" — uma biblioteca instalada via npm (`npm install mongodb`) — que atua como ponte, traduzindo nossos comandos JavaScript para a linguagem de rede que o cluster do MongoDB Atlas entende.
2. **Conversão BSON/JSON Automática**: O MongoDB armazena dados em um formato binário ultrarrápido chamado **BSON** (Binary JSON). A grande mágica do driver Node.js é que ele faz a conversão de BSON para JSON automaticamente nos bastidores. Quando você busca um documento, ele já chega na sua aplicação como um objeto JavaScript nativo, pronto para ser acessado usando a clássica notação de ponto (ex: `resultado.account_id`).
3. **Assincronicidade (Promises & `async/await`)**: O Node.js é "não-bloqueante". Como operações de banco de dados exigem ir até a nuvem e voltar (o que leva tempo), todos os métodos do driver (conectar, buscar, inserir) retornam **Promises**. Por isso, você sempre envolverá seu código de banco de dados em blocos `try/catch` dentro de funções `async` e usará o `await` para pausar a execução até que a resposta do banco chegue.

Agora que compreendemos a teoria base, vamos ver tudo isso em prática!

---

## Inserindo Documentos em Aplicações Node.js
Revise o seguinte código, que demonstra como inserir um único documento e múltiplos documentos em uma coleção.

### Inserir um Documento
Para inserir um único documento em uma coleção, anexe `insertOne()` à variável da coleção. O método `insertOne()` aceita um documento como argumento e retorna uma *promise* (promessa). Neste exemplo, o documento que está sendo inserido é armazenado em uma variável chamada `sampleAccount`, que é declarada logo acima da função `main()`.

```javascript
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccount = {
  account_holder: "Linus Torvalds",
  account_id: "MDB829001337",
  account_type: "checking",
  balance: 50352434,
}

const main = async () => {
  try {
    await connectToDatabase()
    // O método insertOne é usado aqui para inserir o documento sampleAccount
    let result = await accountsCollection.insertOne(sampleAccount)
    console.log(`Inserted document: ${result.insertedId}`)
  } catch (err) {
    console.error(`Error inserting document: ${err}`)
  } finally {
    await client.close()
  }
}
 
main()
```

### Inserir Vários Documentos
Para inserir mais de um documento, anexe o método `insertMany()` ao objeto da coleção e, em seguida, passe um array de documentos para o método `insertMany()`. O método `insertMany()` retorna uma *promise*. Usamos o `await` na promise para obter o resultado da operação, que usamos então para registrar no console o número de documentos que foram inseridos. Neste exemplo, as contas a serem inseridas são armazenadas em uma variável de array chamada `sampleAccounts`. Esta variável é definida logo acima da função `main()`.

```javascript
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

const sampleAccounts = [
  {
    account_id: "MDB011235813",
    account_holder: "Ada Lovelace",
    account_type: "checking",
    balance: 60218,
  },
  {
    account_id: "MDB829000001",
    account_holder: "Muhammad ibn Musa al-Khwarizmi",
    account_type: "savings",
    balance: 267914296,
  },
]
 
const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.insertMany(sampleAccounts)
    console.log(`Inserted ${result.insertedCount} documents`)
    console.log(result)
  } catch (err) {
    console.error(`Error inserting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

---

## Consultando uma Coleção MongoDB em Aplicações Node.js (Find/Read)
Revise o seguinte código, que demonstra como consultar (buscar) documentos no MongoDB usando Node.js.

### Usando find()
O método `find()` é uma operação de leitura que retorna um cursor para os documentos que correspondem à consulta. O método `find()` recebe um documento de consulta ou filtro como argumento. Se você não especificar um documento de consulta, o método `find()` retornará todos os documentos da coleção.

Neste exemplo, procuramos todas as contas que possuem um saldo (balance) maior ou igual a 4700. O método `find()` aceita um filtro de consulta, que atribuímos a uma variável chamada `documentsToFind`. Processamos cada documento retornado do método `find()` iterando o cursor (atribuído à variável `result`).

```javascript
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

// Documento usado como filtro para o método find()
const documentsToFind = { balance: { $gt: 4700 } }
 
const main = async () => {
  try {
    await connectToDatabase()
    // O método find() é usado aqui para encontrar documentos que correspondam ao filtro
    let result = accountsCollection.find(documentsToFind)
    let docCount = accountsCollection.countDocuments(documentsToFind)
    await result.forEach((doc) => console.log(doc))
    console.log(`Found ${await docCount} documents`)
  } catch (err) {
    console.error(`Error finding documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

### Usando findOne()
Neste exemplo, retornamos um único documento de uma consulta, que é atribuído a uma variável chamada `documentToFind`. Usamos o método `findOne()` no objeto da coleção para retornar o primeiro documento que corresponde aos critérios de filtro, definidos na variável `documentToFind`.

```javascript
const dbname = "bank"
const collection_name = "accounts"
 
const accountsCollection = client.db(dbname).collection(collection_name)

// Documento usado como filtro para o método findOne()
const documentToFind = { _id: ObjectId("62a3638521a9ad028fdf77a3") }

const main = async () => {
  try {
    await connectToDatabase()
    // O método findOne() é usado aqui para encontrar o primeiro documento que corresponda ao filtro
    let result = await accountsCollection.findOne(documentToFind)
    console.log(`Found one document`)
    console.log(result)
  } catch (err) {
    console.error(`Error finding document: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

---

## 🛠️ Scripts de Exemplo (Lab)
A base para testar esse código na prática foi criada dentro das pastas de laboratório. Você pode rodar as aplicações Node.js simulando a conexão com seu cluster do Atlas.

* 🧪 **[Lab: Inserting Documents in Node.js](./insert-lab/readme.md)**
* 🧪 **[Lab: Querying Documents in Node.js](./find-lab/readme.md)**
* 🧪 **[Lab: Updating Documents in Node.js](./update-lab/readme.md)**
* 🧪 **[Lab: Deleting Documents in Node.js](./delete-lab/readme.md)**
* 🧪 **[Lab Especial: MongoDB Transactions in Node.js](./transaction-lab/readme.md)**

---

## 🧠 Quizzes: Working with MongoDB Documents in Node.js

### Pergunta 1
**Como o BSON é convertido em JSON ao usar o driver MongoDB para Node.js? (Selecione uma opção.)**

* [x] **A.** Documentos codificados em BSON são convertidos automaticamente pelo driver, permitindo que você use os dados imediatamente em sua aplicação.
  > **Correto!** Documentos codificados em BSON são convertidos automaticamente pelo driver. Isso significa que você pode usar os dados imediatamente em sua aplicação como JSON normal e acessar propriedades usando notação de ponto. O driver lida com a conversão de BSON para JSON para você.
* [ ] **B.** A conversão entre BSON e JSON é tratada por uma biblioteca de terceiros chamada `body-parser`.
  > **Incorreto.** A conversão entre BSON e JSON é tratada pelo language driver do MongoDB e não requer bibliotecas adicionais.
* [ ] **C.** Documentos codificados em BSON podem ser convertidos para JSON usando o método `.JSON.parse()`.
  > **Incorreto.** O método `JSON.parse()` é usado para converter strings de buffer em JSON.
* [ ] **D.** Node.js pode ler BSON sem nenhuma conversão adicional.
  > **Incorreto.** Embora o Node.js não possa ler BSON sem conversão adicional, o driver pode ler documentos codificados em BSON para que os dados possam ser usados em sua aplicação.

### Pergunta 2
**Você precisa inserir um novo restaurante na coleção `restaurants`. O documento do novo restaurante está armazenado na variável nomeada `hyderabadiBiryani`. Uma referência à coleção está armazenada em uma variável chamada `restaurants`. Qual das seguintes expressões irá inserir o novo documento na coleção `restaurants`? (Selecione uma opção.)**

* [x] **A.** `let result = await restaurants.insertOne(hyderabadiBiryani)`
  > **Correto!** Esta é a expressão correta para usar o método `insertOne()`.
* [ ] **B.** `let result = await restaurants.insert(hyderabadiBiryani)`
  > **Incorreto.** Não existe um método `insert()` atual suportado desta forma. Use `insertOne()` ou `insertMany()`.
* [ ] **C.** `let result = await restaurants.insertMany(hyderabadiBiryani)`
  > **Incorreto.** O método `insertMany()` espera um array de documentos, não um único documento/objeto.
* [ ] **D.** `let result = await restaurants.insert.hyderabadiBiryani`
  > **Incorreto.** Esta sintaxe não é válida no driver do Node.js.

### Pergunta 3
**Você precisa adicionar documentos para os 5 novos bairros na coleção `neighborhoods`. Uma referência para a coleção de bairros está armazenada em uma variável chamada `neighborhoodsCollection`. Documentos para cada novo bairro estão armazenados na variável `neighborhoodUpdate` (que é um array). Qual expressão você deve usar para inserir esses documentos na coleção? (Selecione uma opção.)**

* [ ] **A.** `let result = await neighborhoodsCollection.insertOne(neighborhoodUpdate)`
  > **Incorreto.** `insertOne()` é projetado para inserir apenas um único documento por vez, não um array inteiro.
* [x] **B.** `let result = await neighborhoodsCollection.insertMany(neighborhoodUpdate)`
  > **Correto!** `insertMany()` é a forma correta de passar um array e inserir múltiplos documentos simultaneamente na coleção.
* [ ] **C.** `let result = await neighborhoodsCollection.insert(neighborhoodUpdate)`
  > **Incorreto.** Use a assinatura do método `insertMany()` para matrizes.
* [ ] **D.** `let result = await neighborhoodsCollection.insertOne([neighborhoodOne, neighborhoodTwo, neighborhoodThree, ...])`
  > **Incorreto.** `insertOne()` não aceita arrays como argumento válido.

### Pergunta 4
**Você precisa encontrar a população para o código postal 85281 em Tempe, Arizona. Você quer que o resultado do documento específico seja retornado diretamente para você no terminal. Qual consulta você deve usar para atribuir o resultado à variável `result`? (Selecione uma opção.)**

```javascript
const dbname = "sample_training"
const collection_name = "zips"
const zipsCollection = client.db(dbname).collection(collection_name)

// Documento de filtro para o código postal de Tempe
const tempeZip = {"zip": "85281"}
```

* [ ] **A.** `let result = await sample_training.zips.find({"zip": "85281"})`
  > **Incorreto.** Esta expressão resultará em um erro, pois `sample_training` não está definido.
* [ ] **B.** `let result = await zipsCollection.find(tempeZip)`
  > **Incorreto.** Como essa expressão usa `find()`, ela retornará uma instância de cursor, não um único documento.
* [x] **C.** `let result = await zipsCollection.findOne(tempeZip)`
  > **Correto!** Esta expressão usa `findOne()` e retornará o documento específico com o código postal 85281.
* [ ] **D.** `let result = await zips.findOne("zip": "85281")`
  > **Incorreto.** Esta expressão lançaria um erro de sintaxe. Faltam as chaves do objeto no parâmetro.

### Pergunta 5
**Você precisa encontrar todos os códigos postais (zip codes) da cidade de Tulsa, Oklahoma. Qual consulta você deve usar? (Selecione uma opção.)**

```javascript
const dbname = "sample_training"
const collection_name = "zips"
const zipsCollection = client.db(dbname).collection(collection_name)

// Query
const tulsaDocuments = {"city": "TULSA"}
```

* [x] **A.** `let result = await zipsCollection.find(tulsaDocuments)`
  > **Correto!** Esta expressão retornará uma instância de cursor com os múltiplos documentos para a cidade de Tulsa.
* [ ] **B.** `let result = await zipsCollection.findOne(tulsaDocuments)`
  > **Incorreto.** Esta expressão não retornará uma instância de cursor. Para retornar um cursor de múltiplos documentos, use `find()`.
* [ ] **C.** `let result = await zipsCollection.findOne("city": "TULSA")`
  > **Incorreto.** Esta expressão lançaria um erro de sintaxe.
* [ ] **D.** `let result = await zipsCollection.find("city": "TULSA")`
  > **Incorreto.** Esta expressão lançaria um erro de sintaxe. Faltam as chaves do objeto.

### Pergunta 6 (Highlight Zone Challenge)
**Qual parte do seguinte código é onde o documento de consulta (query) é definido?**

```javascript
const documentsToFind = { balance: { $gt: 4700 } }

const main = async () => {
  try {
    await connectToDatabase()
    let result = accountsCollection.find(documentsToFind)
    let docCount = accountsCollection.countDocuments(documentsToFind)
    await result.forEach((doc) => console.log(doc))
    console.log(`Found ${await docCount} documents`)
  } catch (err) {
    console.error(`Error finding documents: ${err}`)
  } finally {
    await client.close()
  }
}
```

* **Resposta:** A área correta a ser clicada/destacada é a primeira linha de código, onde definimos a constante contendo o filtro da busca:
  `const documentsToFind = { balance: { $gt: 4700 } }`

---

## Atualizando Documentos em Aplicações Node.js (Update)
Revise o seguinte código, que demonstra como atualizar documentos no MongoDB com Node.js.

### Usando updateOne()
Neste exemplo, usamos o `updateOne()` para atualizar o valor de um campo existente em um documento. Anexe o método `updateOne()` ao objeto da coleção para atualizar um único documento que corresponda aos critérios de filtro. O documento de atualização contém as alterações a serem feitas usando o operador `$inc` (para incrementar).

```javascript
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToUpdate = { _id: ObjectId("62d6e04ecab6d8e130497482") }
const update = { $inc: { balance: 100 } }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.updateOne(documentToUpdate, update)
    result.modifiedCount === 1
      ? console.log("Updated one document")
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating document: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

### Usando updateMany()
Neste exemplo, atualizamos vários documentos adicionando um valor à array `transfers_complete` de todos os documentos de contas correntes (`checking`). O método `updateMany()` atualiza todos os documentos da coleção que correspondam ao filtro, usando o operador `$push`.

```javascript
const database = client.db(dbname);
const bank = database.collection(collection_name);

const documentsToUpdate = { account_type: "checking" };
const update = { $push: { transfers_complete: "TR413308000" } }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await bank.updateMany(documentsToUpdate, update)
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated")
  } catch (err) {
    console.error(`Error updating documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

### Pergunta 7
**Zvents recentemente contratou 15 novos funcionários, elevando o número total de funcionários para 70. Você precisa atualizar a coleção `companies` dentro do banco de dados `sample_training`, para que o campo `number_of_employees` seja definido como 70. Qual consulta você deve usar? (Selecione uma opção.)**

```javascript
const dbname = "sample_training"
const collection_name = "companies"
const companiesCollection = client.db(dbname).collection(collection_name)

// Filter
let documentToUpdate = {"name": "Zvents"}

// Update
let updateEmployees = {"$set": {"number_of_employees": 70 }}
```

* [ ] **A.** `let result = await db.companies.updateOne({documentToUpdate, updateEmployees})`
  > **Incorreto.** Lançaria um erro de sintaxe, e `db.companies` não é uma referência definida da coleção.
* [ ] **B.** `let result = await companiesCollection.updateOne({ documentToUpdate}, { updateEmployees})`
  > **Incorreto.** Passar as variáveis dentro de novas chaves altera a estrutura do documento, causando erro.
* [ ] **C.** `let result = await companiesCollection.update(documentToUpdate)`
  > **Incorreto.** Falta o documento contendo a operação de atualização.
* [x] **D.** `let result = await companiesCollection.updateOne(documentToUpdate, updateEmployees)`
  > **Correto!** Esta é a sintaxe exata para usar `updateOne()` separando as variáveis de Filtro e Atualização.

### Pergunta 8
**A coleção `companies` está sem dados sobre ofertas públicas iniciais (IPO) para LinkedIn e Facebook. Considerando o arquivo Node.js abaixo, selecione a expressão que define o campo `ipo` como `true` para as duas empresas. (Selecione uma opção.)**

```javascript
const dbname = "sample_training"
const collection_name = "companies"
const companiesCollection = client.db(dbname).collection(collection_name)

// Filter document
const selectCompanies = {"name": { "$in" : ["Facebook", "LinkedIn"]}}

// Update document
const setIpo = {"$set": {"ipo": true}}
```

* [ ] **A.** `let result = await sample_training.updateMany(selectCompanies, setIpo)`
  > **Incorreto.** `sample_training` é apenas a string do nome do banco de dados, e não a referência da coleção.
* [x] **B.** `let result = await companiesCollection.updateMany(selectCompanies, setIpo)`
  > **Correto!** Esta expressão executará corretamente as atualizações na coleção.
* [ ] **C.** `let result = await companies.update(selectCompanies, setIpo)`
  > **Incorreto.** `companies` não está definido no script.
* [ ] **D.** `let result = await companiesCollection.updateMany[selectCompanies, setIpo]`
  > **Incorreto.** Funções/Métodos devem ser chamados com parênteses `()`, não colchetes `[]`.

---

## Deletando Documentos em Aplicações Node.js (Delete)
Revise o seguinte código, que demonstra como deletar documentos no MongoDB com Node.js.

### Usando deleteOne()
Para deletar um único documento de uma coleção, use o método `deleteOne()` em um objeto de coleção. Este método aceita um filtro de consulta que corresponde ao documento que você deseja deletar. Se você não especificar um filtro, o MongoDB corresponderá e deletará o primeiro documento da coleção.

```javascript
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentToDelete = { _id: ObjectId("62d6e04ecab6d8e13049749c") }

const main = async () => {
  try {
    await connectToDatabase()
    let result = await accountsCollection.deleteOne(documentToDelete)
    result.deletedCount === 1
      ? console.log("Deleted one document")
      : console.log("No documents deleted")
  } catch (err) {
    console.error(`Error deleting documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
```

### Usando deleteMany()
Você pode deletar vários documentos de uma coleção em uma única operação chamando o método `deleteMany()` em um objeto de coleção. Para especificar quais documentos deletar, passe um filtro de consulta que corresponda aos documentos. Se você fornecer um documento vazio (`{}`), o MongoDB corresponderá e deletará todos os documentos da coleção. No exemplo a seguir, deletamos todas as contas com um saldo (balance) menor que 500. Em seguida, imprimimos o número total de documentos deletados.

```javascript
const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

const documentsToDelete = { balance: { $lt: 500 } }

const main = async () => {
 try {
   await connectToDatabase()
   let result = await accountsCollection.deleteMany(documentsToDelete)
   result.deletedCount > 0
     ? console.log(`Deleted ${result.deletedCount} documents`)
     : console.log("No documents deleted")
 } catch (err) {
   console.error(`Error deleting documents: ${err}`)
 } finally {
   await client.close()
 }
}
 
main()
```

### Pergunta 9
**Use o conjunto de dados (com as contas Louis Lewis, Adelen Værnes e Juan Perez) para responder. O que acontece quando você executa o seguinte comando? (Selecione uma opção.)**

```javascript
const filter = { account_type: "checking" }
db.accounts.deleteMany(filter)
```

* [x] **A.** Louis Lewis e Adelen Værnes são os dois únicos documentos que sobram na coleção.
  > **Correto!** O filtro corresponde ao `account_type` "checking" e o deleta da coleção (neste caso, a conta do Juan Perez). As outras contas são do tipo "savings" e, portanto, permanecem.
* [ ] **B.** Juan Perez é o único documento que sobra na coleção.
  > **Incorreto.** Juan Perez é justamente a conta que será deletada, por ser a única do tipo "checking".
* [ ] **C.** Nenhuma mudança acontece na coleção.
  > **Incorreto.** O filtro corresponde à conta com tipo "checking" (Juan Perez) e a remove.
* [ ] **D.** O campo `account_type` com valor "checking" é deletado de todos os documentos da coleção.
  > **Incorreto.** O comando `deleteMany` remove os documentos inteiros que correspondem ao filtro, e não apenas o campo.

### Pergunta 10
**Um banco identificou uma conta fraudulenta com o `account_id` de `MDB905411541`. Dado o arquivo Node.js abaixo, qual expressão você deve usar para remover essa conta? (Selecione uma opção.)**

```javascript
const dbname = "bank"
const collection_name = "accounts"
const accountsCollection = client.db(dbname).collection(collection_name)

// Filter by account_id
let fraudAccount = {"account_id": "MDB905411541"}
```

* [ ] **A.** `let result = await accountsCollection.delete(fraudAccount)`
  > **Incorreto.** Esta expressão lançará um erro, pois o método `delete()` não existe no driver do Node.js.
* [ ] **B.** `let result = await accountsCollection.hide(fraudAccount)`
  > **Incorreto.** Esta expressão lançará um erro, pois o método `hide()` não existe.
* [ ] **C.** `let result = await accountsCollection.delete(account)`
  > **Incorreto.** O método `delete()` não existe e a variável `account` não está definida.
* [x] **D.** `let result = await accountsCollection.deleteOne(fraudAccount)`
  > **Correto!** Esta expressão usa o método `deleteOne()` e deletará especificamente a conta alvo.

---

## Criando Transações MongoDB em Aplicações Node.js (Transactions)
Revise o seguinte código, que demonstra como criar transações multi-documento no MongoDB usando Node.js.

### Criando uma Transação
Nesta seção, revisaremos o código para criar uma transação passo a passo. Iniciamos a transação usando o método `withTransaction()` da sessão (*session*). Em seguida, definimos a sequência de operações a serem realizadas dentro da transação, passando o objeto da sessão para cada operação.

```javascript
// Crie as variáveis usadas na transação.
const accounts = client.db("bank").collection("accounts")
const transfers = client.db("bank").collection("transfers")

// Informações da conta
let account_id_sender = "MDB574189300"
let account_id_receiver = "MDB343652528"
let transaction_amount = 100

// Inicie uma nova sessão.
const session = client.startSession()

// Comece uma transação com o método withTransaction() na sessão.
const transactionResults = await session.withTransaction(async () => {
  
  // Atualize o campo de saldo da conta do remetente (sender)
  const senderUpdate = await accounts.updateOne(
    { account_id: account_id_sender },
    { $inc: { balance: -transaction_amount } },
    { session }
  )

  // Atualize o campo de saldo da conta do destinatário (receiver)
  const receiverUpdate = await accounts.updateOne(
    { account_id: account_id_receiver },
    { $inc: { balance: transaction_amount } },
    { session }
  )

  // Crie um documento de transferência e insira na coleção de transferências
  const transfer = {
    transfer_id: "TR21872187",
    amount: 100,
    from_account: account_id_sender,
    to_account: account_id_receiver,
  }
  const insertTransferResults = await transfers.insertOne(transfer, { session })

  // Atualize a lista de transferências da conta do remetente
  const updateSenderTransferResults = await accounts.updateOne(
    { account_id: account_id_sender },
    { $push: { transfers_complete: transfer.transfer_id } },
    { session }
  )

  // Atualize a lista de transferências da conta do destinatário
  const updateReceiverTransferResults = await accounts.updateOne(
    { account_id: account_id_receiver },
    { $push: { transfers_complete: transfer.transfer_id } },
    { session }
  )
})

// Registre uma mensagem sobre o sucesso ou falha da transação.
if (transactionResults) {
  console.log("Transaction completed successfully.")
} else {
  console.log("Transaction failed.")
}

// Feche a sessão e o client.
} catch (err) {
  console.error(`Transaction aborted: ${err}`)
  process.exit(1)
} finally {
  await session.endSession()
  await client.close()
}
```

### Pergunta 11
**Se uma das operações falhar, o que acontecerá com as outras operações na transação? (Selecione uma opção.)**

```javascript
const session = client.startSession();

try {
  await session.withTransaction(async () => {
    await collection.deleteOne({ _id: 1 }, { session });
    await collection.deleteOne({ _id: 2 }, { session });
    await collection.updateOne({ _id: 3 }, { $set: { name: "New Name" } }, { session });
    await collection.insertOne({ _id: 4, name: "New Document" }, { session });
  });
} catch (error) {
  console.log(error);
} finally {
  await session.endSession();
}
```

* [x] **A.** As operações que não falharam não serão consolidadas (committed).
  > **Correto!** Se uma das operações falhar, as operações que não falharam não serão confirmadas (*committed*). Toda a transação será cancelada (*rollback*) e nenhuma operação será gravada de forma definitiva.
* [ ] **B.** As operações que não falharam serão consolidadas (committed).
  > **Incorreto.** Se uma operação falha, toda a transação é cancelada. Nenhuma das operações será confirmada.

### Pergunta 12
**Qual método inicia a transação, executa a função de retorno de chamada (callback) e então confirma (commits) ou cancela a transação? (Selecione uma opção.)**

* [ ] **A.** `startSession()`
  > **Incorreto.** `startSession()` cria uma sessão na qual transações podem ser associadas, mas não inicia uma transação em si.
* [x] **B.** `withTransaction()`
  > **Correto!** O método `withTransaction()` pega a sessão, inicia a transação, executa o callback contendo as operações e realiza automaticamente o *commit* se for sucesso, ou *abort* (rollback) caso haja exceções.
* [ ] **C.** `commitTransaction()`
  > **Incorreto.** Confirma explicitamente a transação apenas. Ele não inicia nem executa o callback.
* [ ] **D.** `bulkWrite()`
  > **Incorreto.** Usado para operações de gravação em massa, mas não oferece as garantias transacionais no nível de sessão em múltiplas coleções por si só sem estar amarrado a um bloco transacional.

---

## 🏆 Resumo e Próximos Passos (Next Steps)

Nesta unidade, você aprendeu como:
* Expressar documentos em Node.js (BSON/JSON automático).
* Inserir documentos usando `insertOne()` e `insertMany()`.
* Consultar documentos usando `findOne()` e `find()`.
* Atualizar documentos usando `updateOne()` e `updateMany()`.
* Deletar documentos usando `deleteOne()` e `deleteMany()`.
* Criar uma transação multi-documento com `startSession` e `withTransaction()`.

Ao concluir esta unidade, você deu um grande passo para concluir a trilha **Using MongoDB with Node.js**. Se você estiver interessado em continuar, seu próximo passo será:

* ➡️ **Unit 03: MongoDB Aggregation with Node.js**
