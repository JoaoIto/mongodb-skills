# Lab: Criando e Gerenciando Índices no Node.js

Este laboratório demonstra como gerenciar índices em uma coleção MongoDB através do driver do Node.js. 
Serão criados e gerenciados os seguintes tipos de índices:
1. **Single Field Index** (Índice de Campo Único)
2. **Unique Index** (Índice Único que previne duplicatas)
3. **Multikey Index** (Índice Multichave aplicado a arrays)
4. **Compound Index** (Índice Composto aplicado em múltiplos campos simultaneamente)
5. **Drop Indexes** (Exclusão e limpeza de índices)

## Estrutura do Lab

O arquivo `app.js` conecta-se ao banco de dados `shop` e interage com a coleção `users`.
Ele executa a criação de índices através do método `createIndex()`. Quando um array é indexado (como o campo `roles`), o MongoDB automaticamente cria um Multikey Index nos bastidores. O script também tenta inserir um documento para testar a restrição de índice único (Unique Constraint).

## Como executar o código

1. Instale as dependências (se ainda não estiverem instaladas):
   ```bash
   npm install
   ```

2. Atualize as Credenciais:
   Abra o arquivo `app.js` e substitua a variável `uri` pela sua connection string real do MongoDB Atlas.

3. Execute no terminal:
   ```bash
   node app.js
   ```
