# Lab: Querying on Array Elements in MongoDB

O MongoDB é muito poderoso ao lidar com campos que contêm **Arrays** (listas) e até mesmo arrays de subdocumentos. Neste módulo exploramos como realizar consultas diretas e utilizar o operador especial `$elemMatch`.

## 🔍 Consultando Elementos Básicos de um Array

Para encontrar documentos onde um determinado array contém um valor específico, você **não precisa** passar a busca em formato de colchetes `[]` se quiser apenas verificar a *presença* do elemento na lista de valores primitivos.

Basta buscar o campo do array apontando para a string (ou número) desejado. O MongoDB varrerá os arrays de todos os documentos e retornará aqueles em que o valor constar lá dentro.

```javascript
// Retorna qualquer conta bancária que possua "InvestmentFund" dentro da lista de products
db.accounts.find({ products: "InvestmentFund" })
```

## 🧩 O Operador `$elemMatch`

Quando o seu campo não é uma lista de strings simples, mas sim uma **lista de objetos (subdocumentos)**, as coisas ficam mais complexas. Você frequentemente precisará que as condições matemáticas batam no *mesmo* objeto dentro da lista.

O operador `$elemMatch` serve exatamente para isso: ele varre um array de objetos e checa se pelo menos um desses objetos atende **simultaneamente a todas as múltiplas condições especificadas**.

```javascript
db.sales.find({
  items: {
    $elemMatch: { 
      name: "laptop", 
      price: { $gt: 800 }, 
      quantity: { $gte: 1 } 
    }
  }
})
```
*Tradução Prática da Query:* Encontre as vendas (`sales`) onde, dentro do array `items`, exista *pelo menos um* produto que tenha nome `"laptop"`, que o preço dele seja *maior* que 800 e que a quantidade comprada seja *maior ou igual* a 1.

---

## 📝 Resolução das Atividades (Quizzes)

Esses são os registros e resoluções dos quizzes que documentamos e resolvemos em formato de simulado ao longo destas lições de busca:

### Quiz 1: Pesquisa de Clientes Insatisfeitos
**Cenário:** Sua empresa quer focar em clientes insatisfeitos com score 1 ou 2. Como seria a Query?
**Resposta Correta:**
```javascript
{ "customer.satisfaction": { $lte: 2 } }
```
*(Motivo: `$lte` significa "Less Than or Equal", ou seja, menor ou igual a 2. Atende 1 e 2 perfeitamente.)*

### Quiz 2: Desconto para Idosos (65 anos ou mais)
**Cenário:** Retornar registros de clientes com idade igual ou superior a 65 anos.
*(Atenção: A questão permitia múltiplas alternativas corretas!)*
**Respostas Corretas:**
* `{ "customer.age": { $gt: 64 } }` -> Maior que 64 (abrange de 65 para cima).
* `{ "customer.age": { $gte: 65 } }` -> Maior ou igual a 65.

*(💡 Nota de aprendizado: Você havia assinalado a alternativa D: `{ $lte: 65 }`. Isso faria o banco trazer todas as pessoas de 65 anos **para baixo**, ou seja, recém-nascidos e jovens iriam receber o desconto de idosos!)*

### Quiz 3: Uso em Subdocumentos (Arrays)
**Cenário:** Qual dos seguintes operadores pode ser usado para encontrar um subdocumento que bata com critérios específicos dentro de um array? (Opções: `&element`, `$elemMatch`, `$subMatch`, `$docMatch`).
**Resposta Correta:** **`$elemMatch`**.
