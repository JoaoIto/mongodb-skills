# MongoDB Skills

Este repositório é dedicado aos exercícios práticos e notas de estudo para a trilha **MongoDB Node.js Developer Path** e outras certificações/badges oficiais da MongoDB. Este material não contém apenas um curso, mas atua como um guia rápido, pragmático e como ferramenta de reflexão para toda a jornada de aprendizagem técnica.

---

## 🏆 Minhas Conquistas (Badges & Certificações)

Abaixo estão as credenciais e trilhas que conquistei/concluí através da plataforma oficial MongoDB:

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
  <!-- Badge: MongoDB Overview -->
  <a href="#" target="_blank">
    <img src="https://images.credly.com/size/340x340/images/0b4c54ef-b1d8-4aa7-a658-230b74dec7f6/blob" width="160" alt="MongoDB Overview Badge" />
  </a>
  <!-- Badge: Relational to Document Model -->
  <a href="#" target="_blank">
    <img src="https://images.credly.com/size/340x340/images/234edfc5-0177-46e7-a61a-071f060af2f6/blob" width="160" alt="Relational to Document Model Badge" />
  </a>
</div>

**🎯 Grande Objetivo de Estudo:**
<br/>
<img src="https://d36ai2hkxl16us.cloudfront.net/course-uploads/7985c085-3b6a-42d5-b668-e41cb6eedeb0/4gnbpsehb9ih-credlybadge-associatedeveloper2.png" width="160" alt="MongoDB Associate Developer Badge" />
<br/><br/>

**🎓 Learning Path Finalizado:**
<br/>
<a href="https://learn.mongodb.com/learn/learning-path/mongodb-nodejs-developer-path" target="_blank">
  <img src="https://d36ai2hkxl16us.cloudfront.net/thoughtindustries/image/upload/a_exif,c_fill,w_750,h_361/v1/course-uploads/ae62dcd7-abdc-4e90-a570-83eccba49043/61tq2sbjaux6-Node_LP_Catalog1.png" width="300" alt="MongoDB Node.js Developer Path" />
</a>

---

Abaixo está o **Sumário Principal** estruturado de forma hierárquica, separando a trilha principal de Node.js dos badges e módulos adicionais.

---

## 📖 Sumário Principal

### 🚀 Learning Path: MongoDB Node.js Developer
Módulos que fazem parte da trilha oficial para a certificação Node.js Developer.

#### 📘 [1. MongoDB and the Document Model](./nodejs-developer-path/01-document-model/readme.md)
Estrutura de documentos, schema flexível e tipos de dados BSON.
* 🧪 [Lab: Managing Databases and Collections (Atlas UI)](./nodejs-developer-path/01-document-model/managing-databases/lab/readme.md)
* 📑 [Topic: Data Relationships (Embedding vs Referencing)](./nodejs-developer-path/01-document-model/data-relationships/readme.md)
* 📑 [Topic: Data Types (BSON)](./nodejs-developer-path/01-document-model/data-types/readme.md)

#### 📘 [2. Connecting Using MongoDB Shell](./nodejs-developer-path/02-mongodb-shell/readme.md)
Uso da Connection String, operações interativas e scripts no terminal `mongosh`.
* 🧪 [Lab: Install and Connect mongosh](./nodejs-developer-path/02-mongodb-shell/lab/readme.md)
* 🧪 [Lab: Troubleshoot Network Access Errors](./nodejs-developer-path/02-mongodb-shell/troubleshooting-lab/readme.md)
* 🧪 [Lab: Using the MongoDB Shell (Insert/Find)](./nodejs-developer-path/02-mongodb-shell/using-mongosh-lab/readme.md)
* 🧪 [Lab: Run JS Functions and External Scripts](./nodejs-developer-path/02-mongodb-shell/js-scripts-lab/readme.md)
* 🧪 [Lab: Edit Commands in the MongoDB Shell](./nodejs-developer-path/02-mongodb-shell/edit-commands-lab/readme.md)

#### 📘 [3. Connecting to MongoDB in Node.js](./nodejs-developer-path/03-connecting-nodejs/readme.md)
Inicializando a conexão programática assíncrona utilizando o MongoDB Node.js Driver.
* 🧪 [Lab: Connecting to an Atlas Cluster in Node.js](./nodejs-developer-path/03-connecting-nodejs/lab/readme.md)

#### 📘 [4. MongoDB CRUD Operations](./nodejs-developer-path/04-crud-operations/readme.md)
Operações fundamentais de manipulação e resgate de dados em coleções (Create, Read, Update/Replace, Delete).
* 🧪 [Lab: Inserting Documents (`insertOne`)](./nodejs-developer-path/04-crud-operations/insert-lab/readme.md)
* 🧪 [Lab: Inserting Multiple Documents (`insertMany`)](./nodejs-developer-path/04-crud-operations/insert-many-lab/readme.md)
* 🧪 [Lab: Finding Documents (Equality, `$in`, `$gt`, `$lt`)](./nodejs-developer-path/04-crud-operations/find-lab/readme.md)
* 🧪 [Lab: Querying Array Elements (`$elemMatch`) e Quizzes](./nodejs-developer-path/04-crud-operations/array-queries-lab/readme.md)
* 🧪 [Lab: Logical Operators (`$and`, `$or`)](./nodejs-developer-path/04-crud-operations/logical-operators-lab/readme.md)
* 🧪 [Lab: Replace and Delete Documents](./nodejs-developer-path/04-crud-operations/replace-delete/readme.md)
* 🧪 [Lab: Modifying Query Results (Sort, Limit, Projection)](./nodejs-developer-path/04-crud-operations/modifying-query-results/readme.md)

#### 📘 [5. MongoDB CRUD Operations in Node.js](./nodejs-developer-path/05-crud-nodejs/readme.md)
Integração de operações CRUD programáticas usando o MongoDB Node.js Driver.
* 🧪 [Lab: Inserting Documents in Node.js](./nodejs-developer-path/05-crud-nodejs/insert-lab/readme.md)
* 🧪 [Lab: Querying Documents in Node.js](./nodejs-developer-path/05-crud-nodejs/find-lab/readme.md)
* 🧪 [Lab: Updating Documents in Node.js](./nodejs-developer-path/05-crud-nodejs/update-lab/readme.md)
* 🧪 [Lab: Deleting Documents in Node.js](./nodejs-developer-path/05-crud-nodejs/delete-lab/readme.md)
* 🧪 [Lab Especial: MongoDB Transactions in Node.js](./nodejs-developer-path/05-crud-nodejs/transaction-lab/readme.md)

#### 📘 [6. MongoDB Indexes](./nodejs-developer-path/06-indexes/readme.md)
Estruturas de dados para aprimoramento de consultas (Single Field, Unique e métricas de query via Explain).

#### 📘 [7. MongoDB Aggregation](./nodejs-developer-path/07-aggregation/readme.md)
Framework poderoso de processamento em lote e sumarização de dados usando pipelines de agregação ($match, $group).

#### 📘 [8. MongoDB Aggregation with Node.js](./nodejs-developer-path/08-aggregation-nodejs/readme.md)
Integração e execução prática de Aggregation Pipelines em aplicações Node.js utilizando o driver nativo do MongoDB.

#### 📘 [9. MongoDB Transactions (ACID)](./nodejs-developer-path/09-transactions/readme.md)
Uso de Sessões e transações multi-documento para garantir Atomicidade, Consistência, Isolamento e Durabilidade.

#### 📘 [10. Introduction to Atlas Search](./nodejs-developer-path/10-atlas-search/readme.md)
Configuração de índices de busca (Full-Text Search), mapeamentos estáticos/dinâmicos e queries avançadas de texto.

---

### 🎖️ MongoDB Badges & Extras
Módulos independentes, guias e laboratórios que conferem badges específicos.

* 📜 **[Guia Oficial de Certificação MongoDB (Associate Developer)](./nodejs-developer-path/docs/readme.md)**
  * Detalhes sobre os pré-requisitos, pesos de cada tema na prova (CRUD, Indexes, Node.js Driver), regras de realização do exame e o que esperar no dia da prova!

#### 📘 [MongoDB Overview](./badges/overview/README.md)
Princípios fundamentais de bases de dados Orientadas a Documentos, Clusters e Replica Sets.
* 🧪 [Lab: Aggregation Framework (Single View)](./badges/overview/src/updateProducts.js)
