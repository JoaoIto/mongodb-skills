# Guia Oficial para Certificação MongoDB Associate Developer

Este documento sintetiza os dois guias oficiais da MongoDB (`MongoDBCertificationProgramGuide.pdf` e `MongodDBAssociateDeveloperExamGuide.pdf`) em um material de consulta rápida e direto. O objetivo é fornecer a rota de estudos e as orientações exatas que você precisará seguir para obter a certificação **MongoDB Associate Developer**.

---

## 🚀 O que é a Certificação?

A certificação **MongoDB Associate Developer** comprova que você domina as habilidades essenciais para criar aplicações utilizando o MongoDB como banco de dados principal. Empresas buscam profissionais certificados para validar competências, e ter esse badge Credly oficial ajuda você a se destacar no mercado de trabalho e na comunidade (com visibilidade no *MongoDB Talent Directory*).

* **Nível:** Associate (Nível Pleno)
* **Preço do Exame:** USD $150
* **Duração:** 75 Minutos
* **Formato:** Online com proctoring (fiscalização via câmera e tela compartilhada).
* **Idioma:** Inglês (Com possibilidade de extensão de tempo caso não seja seu idioma nativo, mediante aviso prévio de 72 horas ao e-mail `certification@mongodb.com`).

---

## 📚 O que cai na prova? (Domínios de Conhecimento)

A prova possui **53 questões** (algumas de múltipla escolha simples, outras com múltiplas respostas corretas). Destas, algumas perguntas servem apenas como "testes de campo" não pontuados para futuras provas, porém você não saberá quais são elas. A prova é baseada no uso prático do dia a dia, distribuída com os seguintes pesos percentuais:

***Questões de teste para certificação:*** [MongoDB Associate Developer](https://learn.mongodb.com/courses/associate-developer-node-practice-questions) (Algumas questões são exclusivas da versão)

### 1. MongoDB Overview and The Document Model (8%)
*📚 **Material de Estudo:** [MongoDB Overview](../../badges/overview/README.md)*
* Diferenciar tipos suportados pelo BSON.
* Identificar como documentos de formatos totalmente diferentes (Polimorfismo/Flexibilidade) podem coexistir na mesma coleção de banco de dados.

### 2. Operações CRUD (51%) - *[O Coração da Prova]*
*📚 **Materiais de Estudo:** [MongoDB CRUD Operations](../05-crud-nodejs/readme.md) | [MongoDB Aggregation](../07-aggregation/readme.md)*
* Identificar comandos de `$insert` corretos e incorretos.
* Executar updates complexos (com e sem operadores como `$set`).
* Atualizações condicionais avançadas (`upsert: true`).
* Saber identificar saídas de alterações concorrentes via `findAndModify` (Transações).
* Uso massivo de filtros: igualdade simples em arrays, operadores relacionais (`$gt`, `$lt`), lógicos (`$and`, `$or`), operador especializado `$in` e o importantíssimo `$elemMatch`.
* Configuração e efeitos de paginação via Query Cursor com `.sort()` e `.limit()`.
* Projeções (identificar projeções inválidas que tentam incluir e excluir campos ao mesmo tempo, exceto `_id`).
* Comandos nativos de Aggregation, como as dinâmicas dos estágios de `$match`, `$group`, comando `$lookup` (Left Outer Join) e `$out` (Salvar em coleção).
* Conceitos de Atlas Search.

### 3. Índices (17%)
*📚 **Material de Estudo:** [MongoDB Indexes](../06-indexes/readme.md)*
* Saber qual índice criaria impacto num `Collection Scan` e o melhoraria.
* Uso de Índices Simples, Compostos e Multikey (Arrays).
* Saber contar índices e entender Trade-offs (Criar muitos índices deixa a escrita lenta, deletá-los destrói a performance das buscas).
* Ler métricas do plano de execução (`explain()`).

### 4. Modelagem de Dados (4%)
* Relacionamentos Embedded (Documentos Aninhados) vs References (Links), e qual aplicar dependendo do contexto.
* Identificar Anti-Patterns graves de modelagem na estrutura de um esquema MongoDB.

### 5. Tools & Tooling (2%)
* Interação de interface via Atlas Data Explorer (ex: uso do Sample Dataset nativo).

### 6. MongoDB Drivers - Específico para Node.js (18%)
*📚 **Materiais de Estudo:** [Operações Node.js Driver](../05-crud-nodejs/readme.md) | [Node.js Aggregation Pipelines](../08-aggregation-nodejs/readme.md)*
*Atenção: Embora seja a prova Associate genérica, este domínio testará sintaxe de Javascript/Node.js, já que essa foi a linguagem que você escolheu no momento do registro.*
* Como instanciar o driver (o que é o Driver Node.js).
* Componentes de uma String URI de conexão (Formato de DNS SRV).
* Entendimento profundo de Connection Pooling no Driver e como isso aumenta a performance de múltiplas requisições.
* As diferenças explícitas da sintaxe do driver em relação ao MongoDB Shell (MQL vs Node.js).
* Chamadas de comandos em lote como `insertMany()`, `updateMany()` e deleções.

---

## 🛠️ O Dia da Prova: Regras e Proctoring Online

Você fará a prova do conforto de casa utilizando a plataforma **ProctorU**. Para que não perca o investimento e seja desqualificado, siga à risca estas diretrizes de *Online Proctoring*:

* **O Navegador Obrigatório:** É exigido utilizar o navegador **Google Chrome** e instalar a extensão **Guardian Extension**.
* **Ambiente de Prova:** 
  - Você deve estar *absolutamente sozinho* no ambiente durante todos os 75 minutos.
  - A mesa de computador não pode ter nenhum material, papéis, livros ou eletrônicos (como celular e smartwatch).
  - É proibido ler as questões em voz alta, sob pena de encerramento da prova pelo fiscal.
  - O uso de fones de ouvido de qualquer tipo é terminantemente proibido. Você deve usar os alto-falantes e o microfone aberto da sua máquina.
* **Fiscalização Câmera/Tela:** Antes de iniciar a prova, você usará sua webcam para fazer um escaneamento manual do ambiente de 360 graus e também filmar toda a superfície da sua mesa para aprovação do fiscal. A webcam e a tela compartilhada devem permanecer ligadas o tempo todo. Apenas 1 monitor é permitido! (Desconecte monitores externos se estiver em um notebook).
* **Pausas:** Você pode pedir ao fiscal para se levantar e ir ao banheiro, mas o relógio não para (o tempo continua rolando).

### Outros Detalhes Operacionais
* **Resultados:** Você não receberá o valor em percentual explícito aprovativo geral ou das "linhas de corte" necessárias, pois a MongoDB utiliza um cálculo estatístico (psicometria) que varia por versão do exame. A aprovação não exige passar em todos os blocos isoladamente, basta alcançar a pontuação global secreta da versão da prova.
* **Reprovações:** Existe um tempo de *Cooling Off* (Esfriamento). Se reprovar, você não poderá comprar e marcar uma nova tentativa num espaço de 15 dias.
* **Expiração:** De forma super positiva, **as certificações MongoDB atualmente não possuem prazo de validade (não expiram)**.

---
**Bons Estudos e Rumo ao Badge Oficial da Credly!**
