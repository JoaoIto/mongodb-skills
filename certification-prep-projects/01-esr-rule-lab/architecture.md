# Arquitetura e Modelagem: Laboratório ESR

Este laboratório visa validar a eficiência da Regra **Equality, Sort, Range (ESR)** na construção de índices compostos através de um mini-servidor Node.js em **TypeScript** com **Mongoose**.

## 🗄️ Modelo Mongoose (TypeScript)

Substituímos a validação BSON crua do MongoDB pelo **Mongoose**, trazendo tipagem estrita para nossa aplicação.

### `CarSchema.ts`

```typescript
export interface ICar extends Document {
  manufacturer: string;
  model: string;
  cost: number;
  status: 'New' | 'Used';
  year: number;
}
```

O Mongoose garante automaticamente que tentar salvar um documento com um `cost` negativo ou sem um `manufacturer` falhará na camada da aplicação antes de onerar o banco.

---

## 🛠️ Índices Nativos pelo Schema

Diferente do driver nativo, com o Mongoose nós atrelamos a declaração do índice diretamente no modelo da coleção, o que força o MongoDB a gerar o índice durante a inicialização (ou via `syncIndexes()`).

A query alvo: **"Carros da Ford, ordenados por modelo, que custam mais que $15.000"**.

```typescript
// ❌ O Índice ERS (Ineficiente - Blocking Sort)
CarSchema.index({ manufacturer: 1, cost: 1, model: 1 }, { name: 'idx_ers_bad' });

// ✅ O Índice ESR (A Resposta Certa para Performance)
CarSchema.index({ manufacturer: 1, model: 1, cost: 1 }, { name: 'idx_esr_good' });
```

---

## ⚙️ Mini-Servidor Express

A aplicação TypeScript expõe rotas HTTP para analisarmos as métricas geradas pelo `.explain("executionStats")` do Mongoose.

O servidor acessa a Model `CarModel` e força via `hint()` o uso de cada um dos índices para nos provar a diferença de leitura do banco.
