[⬅️ Voltar ao Sumário Principal](../README.md)

# MongoDB Overview

Este diretório contém o sumário das aprendizagens do curso **MongoDB Overview** promovido pela MongoDB University, focado nos princípios fundamentais de bases de dados Orientadas a Documentos e no desenvolvimento de arquiteturas de dados de alto desempenho. Inclui ainda o código do laboratório "Single-View Products Catalog".

## 📚 Fundamentos do MongoDB

O MongoDB não é apenas uma base de dados NoSQL; é uma base de dados focada no formato de **Documentos**. Abaixo exploramos os alicerces teóricos e de engenharia desta plataforma.

### 1. Dados Orientados a Documentos
No MongoDB, a unidade atómica de armazenamento de dados é um **Documento**, em vez de uma linha (como acontece no SQL) ou uma simples chave-valor. 
* **BSON e JSON**: Os documentos são gravados em formato BSON (Binary JSON), garantindo tipos de dados estritamente otimizados e precisos (datas, números em ponto flutuante, inteiros longos de 64-bits).
* **Coleções**: Um agrupamento de documentos (equivalente às tabelas nos RDBMS) chama-se **Collection**.
* **Flexibilidade (Schema-less vs Validado)**: Permite que diferentes documentos na mesma coleção possuam esquemas de atributos dinâmicos ou ligeiramente mutáveis. Apesar de apelativo o polimorfismo, é muito comum estabelecer Schemas flexíveis de Validação via JSON Schema no MongoDB para estabilidade da aplicação.

### 2. Arquitetura Descentralizada: Clusters e Replica Sets
O MongoDB escala naturalmente. O ambiente na nuvem oficial (Atlas) abstrai grande parte dessa gestão através de uma estrutura assente em **Clusters**. Um Cluster de Base de Dados é essencialmente o perímetro computacional dos seus dados, suportado por uma infraestrutura em **Replica Set**.

* **Replica Set**: Conjuntos de servidores que contêm *cópias exatas* da mesma informação. O Replica Set consiste sempre num nó Primário (onde a base de dados centraliza as operações sensíveis de Escrita) e em múltiplos nós Secundários (réplicas onde é possível redirecionar as operações frequentes de Leitura para balanciamento).
* **Disponibilidade / Resiliência**: Os Replica Sets proporcionam uma Arquitetura de Auto-Recuperação. Se o nó primário falhar subitamente devido a falhas de hardware ou conetividade, os nós paralelos iniciam instantaneamente uma eleição entre si, onde promovem uma réplica secundária a novo Primário temporário, curando a integridade do cluster na escala dos milissegundos e evitando a indisponibilidade prolongada.

---

## 💻 O Desafio Prático - Single-View Products Catalog

No âmbito da exploração do ecossistema MongoDB, foi realizado um laboratório que emula um contexto real de **Microserviços Fragmentados**. O desafio era claro e os requisitos estritos.

### O Contexto Inicial do Laboratório
Numa operação típica, os dados do "Produto X" viajam fragmentados. 
1. **`products`**: Coleção central que conservava apenas características base do retalhista (ID SKU, preços e o fabricante).
2. **`enrichment`**: Coleção secundária que sincronizava dados adicionais de outras integrações, como avaliações de estrelas, métricas descritivas ou cores, sempre correlacionados sobre o ID único do produto.

As queries do front-end começam a causar graves constrangimentos na performance ao necessitar de compor a dita "Página Inteira do Produto" – obrigando a múltiplas sub-queries da aplicação para carregar informação das várias origens do mesmo banco de dados.

### A Missão / Resolução: O "Single View" (Visão Unificada)
A missão fundamental foi escalar as leituras materializando uma pipeline baseada no **Aggregation Framework**.
O desígnio era recolher perfeitamente os sub-documentos fragmentados da coleção primária com a secundária e compor uma perspetiva final (Visão Única) com um *update* massivo para responder às aplicações de forma imediata (*uma read*, *uma collection*).

#### Como foi realizado (Passo a Passo da Lógica):
O script (`/src/updateProducts.js`) atuou por meio de uma pipeline sequencial:

1. **A Junção - `$lookup`**
   Equivalente ao `LEFT OUTER JOIN` relacional, associou os documentos partindo da premissa relacional da Chave Única (`products._id` ligado a `enrichment.product_id`). 

2. **O Nivelamento - `$replaceRoot` e `$mergeObjects`**
   Uma junção com um lookup normal introduz uma nova matriz (*array*) de sub-objetos encapsulada na raiz anterior do produto (o que ainda prejudicaria interações por APIs complicadas). Assim, a Pipeline recorreu ao estágio da Fusão (`$mergeObjects`), achatar a raiz externa num novo corpo liso sem estigmas do arranjo de metadados, devolvendo o controlo ao objeto único primário usando `$replaceRoot`.

3. **A Higienização Limpa - `$project`**
   Expurgou a matriz temporária em memória, que estava a albergar uma cache suja desnecessária para o passo de salvamento de estado do novo documento.

4. **Persistência de Estado Otimizada - `$merge`**
   O resultado limpo foi efetivamente despejado para a coleção nativa alvo. Não como um documento estático isolado (*dump*), mas materialmente injetado numa fundição atómica (quando existisse a correspondência do mesmo id, `whenMatched: "merge"`, faria com que unisse os novos atributos sem eliminar os antigos; quando não, ignorava e não criava vestígios fantasma `discard`).

### Desfecho
De uma arquitetura separada de múltiplos repositórios (`relationships`), passou-se para uma **Single View Pattern**. As coleções fundiram-se para gerar as respostas mais performáticas possíveis para o Front-end perante um `findOne()`.

---
**💡 Nota Vital de Certificação MongoDB:** 
O dogma primordial dos Document Models dita o seguinte mantra perante a regra do Single View: *"Os dados que as apps de utilizador consultam e alteram em simultâneo (Data that is accessed together), devem imperativamente transitar e ser guardados agregados dentro da mesma arquitetura documental (Should be stored together)."*
