# Lab: Aggregation Application in Node.js

Esta aplicação consolida o aprendizado de Aggregation no MongoDB diretamente no código Node.js, utilizando o driver nativo. O lab é dividido em dois pipelines distintos demonstrando a junção dos estágios principais.

## Estrutura do Pipeline

No script `app.js`, você verá as seguintes operações focadas na coleção `bank.accounts`:

### Pipeline 1: `$match` e `$group`
Filtramos (`$match`) contas que possuem saldo menor que $1.000. Em seguida agrupamos (`$group`) os documentos baseados no tipo de conta (`account_type`) para então calcular a somatória total de saldos e a média (`$avg` e `$sum`).

### Pipeline 2: `$sort` e `$project`
Filtramos contas do tipo `checking` que possuem pelo menos $1.500 de saldo. Depois ordenamos (`$sort`) os resultados de forma descendente pelos saldos. Por fim, projetamos (`$project`) ocultando o `_id`, mantendo variáveis importantes e **criando dinamicamente um novo campo** chamado `gbp_balance`, que converte os dólares para libras esterlinas (GBP) operando uma matemática de divisão (`$divide`).

## Executando o Lab

1. Instale as dependências na pasta do laboratório:
   ```bash
   npm install
   ```

2. Insira a sua *String de Conexão* (URI) no arquivo `app.js`.

3. Rode no terminal para visualizar os retornos dos dois cursores:
   ```bash
   node app.js
   ```
