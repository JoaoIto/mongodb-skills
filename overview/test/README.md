# MongoDB Overview - Questionário de Avaliação

Este diretório preserva a prova de conceitos avaliada da unidade `MongoDB Overview`. Estas perguntas validam o entendimento fundamental da arquitetura, padrão de documentos e escalabilidade do MongoDB e da sua cloud (Atlas).

Abaixo estão expostas as perguntas submetidas no teste de avaliação, juntamente com a escolha correta e a sua devida justificação didática baseada na documentação da MongoDB University.

---

### Pergunta 1
**In which format does MongoDB store data?**
- [ ] The data is stored in tables with rows and columns.
- [ ] The data is stored in a structured format with a fixed schema.
- **[x] The data is stored in documents with a flexible schema.**
- [ ] The data is stored in key-value pairs without any structure.

> **💡 Justificação:**  
> O MongoDB é uma base de dados *Document-Oriented*. Em vez de fixar esquemas rígidos (schema-less design mode), suporta e grava fisicamente através do formato BSON, documentos com capacidades polimórficas altamente flexíveis, permitindo adaptabilidade total e rápida aos requisitos ágeis das aplicações.

---

### Pergunta 2
**What is the smallest unit of data in MongoDB that stores information about an object and its related metadata?**
- **[x] Document**
- [ ] Table

> **💡 Justificação:**  
> Ao contrário das Bases de Dados Relacionais (RDBMS), em que um simples registo ou linha é repartido em tabelas, a mais diminuta e coesa unidade lógica nativa para a base de dados do MongoDB chama-se **Documento**. Um documento concentra a totalidade imediata e estrutural dessa entidade.

---

### Pergunta 3
**A software developer is managing a MongoDB database that stores product information for a retail company. Each product can have different characteristics that vary across product categories. How should the software developer model the product information to accommodate the different attributes of each product?**
- [ ] Create separate collections for each product type and model each product with a fixed schema.
- **[x] Use a single collection in MongoDB where each product document can have different attributes.**
- [ ] Create separate collections for each product type to handle different attributes.
- [ ] Use a relational database to manage the varying product attributes.

> **💡 Justificação:**  
> Ao invés de normalizar excessivamente separando subprodutos por tipos, o padrão da **Coleção Única (Single Collection Pattern)** tira verdadeiro partido do Esquema Flexível do MongoDB. É uma prática corrente do ecossistema alojar itens semelhantes, cujos atributos possam discordar subtilmente da estrutura raiz devido à sua categoria (exemplo da loja de roupa Vs eletrónica num mesmo retalho), não quebrando a lógica de consulta (querying) do backend app-side.

---

### Pergunta 4
**A developer is designing a MongoDB database for a library system. The system needs to store information about books, including genres and authors. The genres will always be accessed together with the books, and the authors will be accessed independently. How should the developer model the data to achieve this?**
- [ ] Embed authors within the book documents and reference genres in a separate collection.
- [ ] Reference both genres and authors in separate collections.
- [ ] Embed both genres and authors within the book documents.
- **[x] Embed genres within the book documents and reference authors in a separate collection.**

> **💡 Justificação:**  
> Trata-se do dogma de ouro da filosofia da engenharia de NoSQL/MongoDB: "*Dados que são acedidos conjuntamente, devem ser armazenados conjuntamente (Accessed together, stored together).*"  
> Se o **Género (Genre)** está inevitavelmente associado à consulta do **Livro (Book)**, a sua modelação é **Embutida (Embed)** dentro do documento raiz do Livro. Como o **Autor (Author)** dita requerimentos próprios operados ocasionalmente em perfis autônomos, rege-se a arquitetura com o fluxo das **Referências Lógicas (Reference / Foreign Key concept)** apartando as coleções.

---

### Pergunta 5
**What is a distributed system in the context of databases?**
- [ ] A system where data is stored in a single database on a single machine.
- **[x] A system where data is spread across multiple machines.**
- [ ] A system that uses a single server to handle all database operations.
- [ ] A system where data is spread across multiple collections within a single database.

> **💡 Justificação:**  
> Um Sistema Distribuído, na tônica do MongoDB, compreende uma base de dados que escala a sua carga distribuindo as funções e informações, cruzando redes complexas de inúmeras máquinas para evitar um único ponto de falha (Single Point of Failure), escalar a nível computacional (Computing Node) de processamento paralelo e assegurar persistência perante a resiliência geográfica.

---

### Pergunta 6
**A database administrator is tasked with ensuring high availability for a MongoDB deployment. Which feature of MongoDB should the administrator use to achieve this goal?**
- [ ] Sharding
- [ ] Indexing
- **[x] Replica Sets (Replication)** 

> **💡 Justificação:**  
> Cuidado com as ratoeiras do design do Cluster:  
> - O *Sharding* serve para Escalar Horizontalmente perante a monstruosidade de Big Data/Volumes (Divisão e Conquista Algorítmica).  
> - Os **Replica Sets** (Replicação) constituem o fundamento primordial da **Alta Disponibilidade (High Availability)**. Tendo um Nó Primário e Cópias Exatas Múltiplas Secundárias, o cluster opera perante Tolerância a Falhas e Recuperação contínua.

---

### Pergunta 7
**A database administrator needs to scale a MongoDB deployment to handle a massive amount of data. The administrator wants to partition the data across multiple machines. Which MongoDB feature should the administrator use to achieve this?**
- [ ] Replication
- **[x] Sharding**
- [ ] Compression
- [ ] Encryption

> **💡 Justificação:**  
> Ao contrário da Replicação (que serve para Alta Disponibilidade através de cópias redundantes parciais da mesma informação), o **Sharding** é a funcionalidade de Escalabilidade Horizontal desenhada pelo MongoDB. Permite "particionar" fatias enormes de dados de uma grande base de dados original em vários nós (máquinas) ou *shards* diferentes, o que previne a exaustão de disco rígido e CPU num só servidor perante instâncias massivas (*massive amount of data*).

---

### Pergunta 8
**An architect is designing a MongoDB Atlas deployment for a global e-commerce platform. The platform requires high availability and minimal downtime, even during unexpected outages. How does a MongoDB Atlas administrator ensure resilience in such scenarios?**
- **[x] By deploying clusters across multiple regions and availability zones**
- [ ] By using a single primary node with multiple backup nodes
- [ ] By maintaining a replica set with three nodes to handle failover
- [ ] By using manual intervention to switch to a backup server in case of failure

> **💡 Justificação:**  
> Embora os Replica Sets sirvam o propósito basilar do Failover, quando se aborda uma arquitetura *Global* cujo negócio demanda "downtime zero" (até em caso de desastres geográficos como cortes de energia ou apagões na rede da cloud originária), a recomendação primária passa sempre pelo **Multi-Region / Multi-Zone Availability Deployment** no Atlas. Caso uma "Availability Zone" (Data Center) da AWS/Google/Azure vá abaixo fisicamente, os nós de outras regiões assumem, contendo a anomalia sem comprometer o sistema global.

---

### Pergunta 9
**A MongoDB product development team is creating a modern AI application for a chatbot. The chatbot needs to understand and respond to user queries based on meaning and context rather than exact keyword matches. Which MongoDB capability should the team use to enable this functionality?**
- [ ] MongoDB Atlas Search
- [ ] MongoDB aggregation framework
- **[x] MongoDB Vector Search**
- [ ] MongoDB sharding

> **💡 Justificação:**  
> A palavra-chave da evolução em pesquisa textual é o contexto semântico (*meaning and context*). Ao contrário da pesquisa léxica ou de *full-text search* simples no Atlas Search (que depende do alinhamento literal de *keywords*), a integração nativa com Inteligência Artificial ocorre usando **MongoDB Vector Search**. Esta valência permite codificar texto não-estruturado em representações matemáticas (*Embeddings*) que conseguem medir afinidade e contexto real de linguagem natural.

---

### Pergunta 10
**A company is evaluating whether to use MongoDB Atlas or continue with their on-premises database solution. The IT manager is concerned about the operational overhead and scalability of their current system. Which feature of MongoDB Atlas would address these concerns?**
- **[x] Automated database management and scaling**
- [ ] Customizable hardware configurations
- [ ] On-premises data storage
- [ ] Manual data backup processes

> **💡 Justificação:**  
> O modelo on-premises detém pesados passivos de esforço humano, atualizações e hardwares sob tutela das Equipas de TI (Operational Overhead). A força motriz da adoção integral do **MongoDB Atlas (DBaaS / Database-as-a-Service)** reside nas potentes orquestrações intrínsecas da nuvem, de onde providenciam Auto-Escalamento inteligente da frota e abstraem a administração total do repositório físico do programador para o sistema automatizado global.

---
