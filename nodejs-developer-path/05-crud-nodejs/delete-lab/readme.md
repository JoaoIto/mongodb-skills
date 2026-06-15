# Lab: Deleting Documents in Node.js

Este laboratório finaliza as operações CRUD base, demonstrando como remover documentos únicos (`deleteOne`) e múltiplos documentos (`deleteMany`) da coleção através do driver MongoDB para Node.js.

## 💻 Estrutura do Lab

No [app.js](./app.js) fornecido, a lógica estabelece a conexão e usa as referências da coleção para:
1. `deleteOne`: Apagar um documento alvo pela sua chave primária `_id` usando a classe `ObjectId`.
2. `deleteMany`: Apagar múltiplos documentos usando um filtro lógico, neste caso `$lt: 500` para apagar contas com saldo menor que 500.

## 🚀 Como executar o código base

1. **Instale as dependências** (se já não estiverem instaladas):
   ```bash
   npm install
   ```

2. **Atualize as Credenciais e IDs**:
   - Abra `app.js` e troque a variável `uri` pelas suas credenciais do Atlas.
   - Para que o `deleteOne` encontre o que apagar, substitua a string dentro de `new ObjectId("...")` por um `_id` de conta que realmente exista no seu banco (que você inseriu antes).

3. **Execute no terminal**:
   ```bash
   node app.js
   ```
