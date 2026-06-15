# Lab: Inserting Multiple Documents em uma Coleção (insertMany)

Seguindo com as operações de criação (Insert), este laboratório explora como inserir vários documentos simultaneamente no banco de dados, utilizando o método `insertMany()` do MongoDB Shell.

## 📥 Instruções e Execução

Para manter o código legível e facilitar a manutenção direto no terminal, é uma boa prática criar um **Array de Objetos** associado a uma variável JavaScript local (no caso, chamamos de `docsToInsert`) antes de passá-la para o método de inserção.

### 1. Preparando os Dados (Array)
No console do `mongosh`, declaramos um array contendo os três novos documentos (contas bancárias), separando cada objeto com vírgula. Note o uso de `new Date()` para gerar carimbos de data/hora dinâmicos.

```javascript
const docsToInsert = [
  {
    account_id: 111789,
    limit: 12000,
    products: ["Commodity", "Brokerage"],
    last_updated: new Date(),
  },
  {
    account_id: 678943,
    limit: 8000,
    products: ["CurrencyService", "Brokerage", "InvestmentStock"],
    last_updated: new Date(),
  },
  {
    account_id: 321654,
    limit: 10000,
    products: ["Commodity", "CurrencyService"],
    last_updated: new Date(),
  }
];
```

### 2. Executando a Inserção (`insertMany`)
Agora, ao invés de digitar toda a estrutura dentro dos parênteses do método, apenas passamos a variável `docsToInsert` diretamente para o `db.accounts.insertMany()`.

**Comando Executado:**
```javascript
db.accounts.insertMany(docsToInsert)
```

**Saída Esperada:**
Como estamos inserindo 3 objetos de uma só vez, a propriedade `insertedIds` da resposta trará um objeto/dicionário mapeando os índices (`'0'`, `'1'`, `'2'`) aos seus respectivos ObjectIds gerados automaticamente.

```javascript
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a2c117cc752f3888e8ce5b0'),
    '1': ObjectId('6a2c117cc752f3888e8ce5b1'),
    '2': ObjectId('6a2c117cc752f3888e8ce5b2')
  }
}
```

---

## 💻 Arquivo de Comandos (Terminal)

Para facilitar a reprodução desse laboratório na sua máquina, salvei as instruções na pasta atual sob o nome de **`insert_multiple_accounts.js`**. Você pode usar esse script no terminal interativo para carregar os múltiplos documentos de uma vez!
