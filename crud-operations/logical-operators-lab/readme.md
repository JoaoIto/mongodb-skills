# Lab: Finding Documents by Using Logical Operators

Neste laboratório, aprendemos a combinar múltiplos filtros de busca (expressões) em uma única query utilizando os operadores lógicos do MongoDB: o **$and Implícito**, o **$or**, e o **$and Explícito**.

## 🤝 1. O `$and` Implícito
Quando você passa múltiplas propriedades separadas por vírgula dentro de um único objeto JSON `{}` na sua query, o MongoDB *automaticamente* aplica a lógica `E` ($and). Todos os requisitos precisam ser verdadeiros simultaneamente.

```javascript
// Busca rotas da Southwest Airlines E que possuam 1 ou mais paradas
db.routes.find({ "airline.name": "Southwest Airlines", stops: { $gte: 1 } })
```

## 🔀 2. O Operador `$or`
O operador lógico `$or` é utilizado quando queremos que os documentos retornados satisfaçam **pelo menos uma** das condições passadas em um array de expressões.

```javascript
// Busca rotas cujo aeroporto de destino (dst) SEJA "SEA" OU cujo aeroporto de origem (src) SEJA "SEA"
db.routes.find({
  $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }]
})
```

## ⛓️ 3. O Operador `$and` (Explícito)
O uso do operador explícito `$and` se faz necessário principalmente quando você quer combinar dois ou mais blocos lógicos complexos (como misturar múltiplos operadores `$or` ao mesmo tempo). Isso seria impossível de fazer apenas com a vírgula (o `$and` implícito) pois teríamos duplicidade de chaves `$or` no mesmo objeto.

```javascript
// Busca rotas que passem pelo aeroporto "SEA" (na origem OU no destino) 
// E que a companhia seja a "American Airlines" OU o avião seja o modelo 320
db.routes.find({
  $and: [
    { $or: [{ dst_airport: "SEA" }, { src_airport: "SEA" }] },
    { $or: [{ "airline.name": "American Airlines" }, { airplane: 320 }] }
  ]
})
```

---

## 📝 Resolução do Quiz (Food Trucks)

**Cenário do Simulado:**
Você quer mapear todos os Food Trucks (tipo móvel) no bairro "ASTORIA" que passaram na inspeção de saúde. Qual documento de query te traria esse resultado combinando esses 3 filtros?

**Resposta Correta (Alternativa C):**
```javascript
{ "sector": "Mobile Food Vendor - 881", "address.city": "ASTORIA", "result": "Pass" }
```

**Por que a "C" está correta?**
Porque ela utiliza perfeitamente a regra de ouro do **`$and` implícito**. Ela agrupa os três filtros diferentes (`sector`, `address.city` e `result`) separados por vírgula dentro de um mesmo objeto JSON raiz. O MongoDB entende automaticamente que os 3 critérios precisam bater.

* As alternativas B e D inventaram sintaxes que não existem (`$and:` ou `&and:` com listas de strings puras ao invés de Objetos).
* A alternativa A espalhou cada filtro num objeto separado `{...}, {...}, {...}`. Isso é inválido sintaticamente para o campo de "filtro" inicial do método `.find()`.
