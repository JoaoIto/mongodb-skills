# Arquitetura e Modelagem: BillLens (Transações ACID)

Este projeto simula um SaaS de pagamentos onde o sistema debita do saldo da carteira do cliente e registra a nota fiscal em um Livro-Razão. Isso é implementado usando **Mongoose + TypeScript**.

## 🗄️ Relacionamento e Schema (Mongoose)

### 1. `SubscriptionSchema.ts` (O Cliente)
Armazena a carteira.

```typescript
export interface ISubscription extends Document {
  customer_id: string;
  balance: number;
}
```

### 2. `LedgerSchema.ts` (O Livro Razão)
Aqui nós temos a funcionalidade de chave relacional forte do Mongoose: o `ref`. O `customer_id` desta coleção não é um texto simples, é um `ObjectId` atrelado diretamente à coleção `Subscription`.

```typescript
export interface ILedger extends Document {
  customer_id: mongoose.Types.ObjectId; // Relacionamento
  amount: number;
  date: Date;
  status: 'PAID' | 'FAILED';
}

const LedgerSchema: Schema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'Subscription', required: true }
  // ...
});
```

---

## ⚙️ Mini-Servidor Express (Transações)

A aplicação gerencia todo esse processo envolta em uma Transação. O código usa `mongoose.startSession()` e `session.withTransaction()`.

* **`GET /api/billing/balance`**: Retorna o saldo do cliente cust_999 (Sempre inicia em $100).
* **`POST /api/billing/charge-success`**: Endpoint que roda a Transação ACID perfeita usando Mongoose.
* **`POST /api/billing/charge-fail`**: Endpoint com falha de rede injetada. O `withTransaction` captura a exceção de rede e reverte as operações da sessão, provando a atomicidade.
