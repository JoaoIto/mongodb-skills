# Document Model no MongoDB

## 📚 Sumário de Conteúdos

* **[Modelo de Documentos](#características-do-modelo-de-documentos)** (Visão Geral - Neste arquivo)
* **[Lesson 2: Data Types in MongoDB](./data-types/readme.md)** (Tipos suportados pelo BSON)
* **[Lesson 3: Managing Databases, Collections, and Documents](./managing-databases/readme.md)** (Visão geral de hierarquia e MongoDB Atlas)
* **[Lab Prático: Managing Databases & Atlas UI](./managing-databases/lab/readme.md)** (Passo a passo da conexão, inserção de dados via UI e consulta com Node.js/mongosh)
* **[Lesson 4 & 5: Data Relationships (Embedding & Referencing)](./data-relationships/readme.md)** (Entidades, Atributos e Modelagem de Relacionamentos)

---

O MongoDB é um banco de dados orientado a documentos (Document-Oriented Database). Isso significa que os dados são armazenados em documentos no formato BSON (Binary JSON), que é uma representação binária de dados estruturados semelhante ao JSON.

## Características do Modelo de Documentos

1. **Flexibilidade de Esquema (Schema-less):** Documentos na mesma coleção não precisam ter exatamente o mesmo conjunto de campos ou estrutura.
2. **Estrutura Hierárquica:** Documentos podem conter outros documentos (sub-documentos) ou arrays, permitindo representar dados complexos de forma aninhada.
3. **Tipos de Dados:** Suporta diversos tipos de dados, como strings, números, booleanos, arrays, objetos, datas, ObjectId, etc.
4. **Desempenho:** A leitura de um único documento muitas vezes recupera todos os dados necessários sem a necessidade de operações complexas de `JOIN`.

## Exemplo de Documento

```json
{
  "_id": ObjectId("5099803df3f4948bd2f98391"),
  "nome": "João",
  "idade": 30,
  "habilidades": ["Node.js", "MongoDB", "React"],
  "endereco": {
    "rua": "Rua A",
    "cidade": "São Paulo"
  }
}
```

---

## 🎓 Conclusão: MongoDB and the Document Model

Nesta unidade (*MongoDB and the Document Model*), você aprendeu a:

* **Describe** MongoDB’s document model and the structure of documents.
* **Explain** the purpose of a flexible schema.
* **List** data types supported by MongoDB.
* **Create** a database and collection in the Atlas UI.
* **Insert** a document in a collection using the Atlas UI.
* **Identify** different types of data relationships: one-to-one, one-to-many, and many-to-many.
* **Distinguish** between embedding and referencing and when to use them.

## 🔗 Resources (Recursos Adicionais)

Utilize os seguintes recursos (oferecidos pela MongoDB University) para continuar seus estudos sobre MongoDB e o modelo de documentos:

* Docs: MongoDB Use Cases
* Docs: Documents
* Docs: BSON Types
* Explaining BSON with Examples
* JSON and BSON
* Docs: Interact with Your Data in MongoDB Atlas
* Docs: Data Modeling
* Embed or Reference Guidelines PDF
* Docs: Database References
* Docs: Model one-to-one relationships with embedded documents
* Docs: Model one-to-many relationships with embedded documents
* Docs: Model one-to-many relationships with document references
* MongoDB University: Data Modeling Learning Path
