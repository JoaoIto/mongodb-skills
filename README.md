# MongoDB Skills

Este repositório é dedicado aos exercícios práticos e notas de estudo para a certificação **MongoDB Associate Developer**. Este material não contém apenas um curso, mas atua como um guia rápido, pragmático e como ferramenta de reflexão para toda a jornada de aprendizagem técnica.

Abaixo está o **Sumário Principal** estruturado de forma hierárquica, garantindo fácil acesso a todos os módulos e seus respectivos laboratórios já documentados.

---

## 📖 Sumário Principal (Módulos e Labs)

### 📘 [1. MongoDB Overview](./overview/README.md)
Princípios fundamentais de bases de dados Orientadas a Documentos, Clusters e Replica Sets.
* 🧪 [Lab: Aggregation Framework (Single View)](./overview/src/updateProducts.js)

### 📘 [2. MongoDB and the Document Model](./document-model/readme.md)
Estrutura de documentos, schema flexível e tipos de dados BSON.
* 🧪 [Lab: Managing Databases and Collections (Atlas UI)](./document-model/managing-databases/lab/readme.md)
* 📑 [Topic: Data Relationships (Embedding vs Referencing)](./document-model/data-relationships/readme.md)
* 📑 [Topic: Data Types (BSON)](./document-model/data-types/readme.md)

### 📘 [3. Connecting Using MongoDB Shell](./mongodb-shell/readme.md)
Uso da Connection String, operações interativas e scripts no terminal `mongosh`.
* 🧪 [Lab: Install and Connect mongosh](./mongodb-shell/lab/readme.md)
* 🧪 [Lab: Troubleshoot Network Access Errors](./mongodb-shell/troubleshooting-lab/readme.md)
* 🧪 [Lab: Using the MongoDB Shell (Insert/Find)](./mongodb-shell/using-mongosh-lab/readme.md)
* 🧪 [Lab: Run JS Functions and External Scripts](./mongodb-shell/js-scripts-lab/readme.md)
* 🧪 [Lab: Edit Commands in the MongoDB Shell](./mongodb-shell/edit-commands-lab/readme.md)

### 📘 [4. Connecting to MongoDB in Node.js](./connecting-nodejs/readme.md)
Inicializando a conexão programática assíncrona utilizando o MongoDB Node.js Driver.
* 🧪 [Lab: Connecting to an Atlas Cluster in Node.js](./connecting-nodejs/lab/readme.md)

### 📘 [5. MongoDB CRUD Operations](./crud-operations/readme.md)
Operações fundamentais de manipulação e resgate de dados em coleções (Create, Read, Update/Replace, Delete).
* 🧪 [Lab: Inserting Documents (`insertOne`)](./crud-operations/insert-lab/readme.md)
* 🧪 [Lab: Inserting Multiple Documents (`insertMany`)](./crud-operations/insert-many-lab/readme.md)
* 🧪 [Lab: Finding Documents (Equality, `$in`, `$gt`, `$lt`)](./crud-operations/find-lab/readme.md)
* 🧪 [Lab: Querying Array Elements (`$elemMatch`) e Quizzes](./crud-operations/array-queries-lab/readme.md)
* 🧪 [Lab: Logical Operators (`$and`, `$or`)](./crud-operations/logical-operators-lab/readme.md)
* 🧪 [Lab: Replace and Delete Documents](./crud-operations/replace-delete/readme.md)
