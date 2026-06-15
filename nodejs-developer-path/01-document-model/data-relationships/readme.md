# Lesson 4 & 5: Data Relationships, Embedding and Referencing

Nesta seção, abordamos os conceitos de modelagem de dados no MongoDB, focando em como os dados se relacionam entre si e como representamos essas relações através de *Embedding* (Embutir) ou *Referencing* (Referenciar).

## Entidades e Atributos

Antes de modelar, é importante entender a diferença entre uma entidade e um atributo:
* **Entidade (Entity):** É um objeto distinto e independente na sua aplicação. Em um banco de dados de filmes, **o filme em si** é a entidade (um documento representando o filme).
* **Atributo (Attribute):** É uma característica ou propriedade de uma entidade. A avaliação (rating), a data de lançamento (release date) e o gênero (genre) são atributos que descrevem o filme.

---

## 📝 Práticas e Quizzes

### 1. Identificando Entidades
**Pergunta:** In the context of a movie database application, which of the following is an example of an entity?
* **Resposta Correta:** A document representing a movie tracked in the database application.
* **Explicação:** O filme é o objeto principal. O gênero, data de lançamento ou avaliação são apenas atributos desse filme.

### 2. Relacionamentos One-to-Many (Um-para-Muitos)
**Pergunta:** In our `movies` collection, which is an example of a one-to-many relationship?
* **Resposta Correta:** A movie and its cast members.
* **Explicação:** Um único filme possui vários atores/membros de elenco. Como o elenco pertence àquele filme, essa é uma relação 1:N típica.

### 3. Modelando One-to-One (Um-para-Um)
**Pergunta:** What is the typical approach for modeling a one-to-one relationship in MongoDB, where one entity is related to exactly one other entity?
* **Resposta Correta:** Embedding (Embutir).
* **Explicação:** Em relações 1:1, a melhor prática no MongoDB é embutir os dados diretamente no mesmo documento, já que eles pertencem um ao outro e são geralmente acessados juntos, evitando consultas extras.

### 4. Modelando Arrays Limitados (Embedding vs Referencing)
**Pergunta:** You are designing a MongoDB schema for a movie database. There are approximately 40 movie genres... A movie will typically belong to a few genres... If you want to include the genre information for each movie... how should you model the relationship?
* **Resposta Correta:** Embed the genres directly within the movie document.
* **Explicação:** Mesmo existindo 40 gêneros no total (e milhares de filmes por gênero), cada filme individualmente tem apenas **alguns poucos** gêneros. Embutir (Embedding) esses poucos gêneros em um array dentro do documento do filme evita o inchaço (bloating) do documento e permite obter os dados em uma única consulta, melhorando a performance. Referenciar via IDs exigiria múltiplas consultas, o que é desnecessário neste cenário de array pequeno.
