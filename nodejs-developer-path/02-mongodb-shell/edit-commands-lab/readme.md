# Lab: Edit Commands in the MongoDB Shell

Ao trabalhar com comandos complexos, consultas multilinhas ou grandes agregações diretamente no terminal, o processo pode se tornar desajeitado. O **MongoDB Shell** contorna esse problema possuindo uma integração nativa com editores de texto diretamente pelo terminal!

Neste laboratório, aprendemos a configurar um editor padrão (como `nano` ou `vim`) e a utilizar o comando interativo `edit` para abrir o editor, formular nossa query longa com conforto e, ao fechar o editor, executá-la no banco de dados.

---

## 🛠️ Passo a Passo da Configuração e Uso

### 1. Verificando o Editor Atual
No terminal do `mongosh` (conectado ao seu banco), você pode checar qual editor está configurado no momento através do objeto interno `config`:

```javascript
config.get("editor")
```
*Saída Inicial Esperada:* `null` (Nenhum editor configurado).

### 2. Definindo o Editor Padrão
Podemos setar o editor de nossa preferência. No laboratório de Ubuntu, o **nano** é uma excelente e simples opção (também pode ser usado o `vim` ou, na sua máquina local, até mesmo o `code` para o VS Code):

```javascript
config.set("editor", "nano")
```

### 3. Usando o Comando `edit`
Com o editor configurado, quando você precisar digitar uma *query* ou um *update* gigantesco, basta digitar o comando abaixo e apertar `Enter`:

```javascript
edit
```

Isso abrirá a interface do editor `nano` dentro do terminal.

### 4. Editando e Executando a Query
Dentro do editor que abriu, colamos a nossa query de atualização complexa e editamos o valor que precisava ser corrigido no laboratório (`account_id` para `443178`):

```javascript
db.transactions.updateOne(
  { account_id: 443178 }, // <-- Valor Modificado aqui!
  {
    $push: {
      transactions: {
        date: new Date(),
        amount: Math.floor(Math.random() * 1000),
        transaction_code: Math.random() < 0.5 ? "buy" : "sell",
        symbol: "test",
        price: "100.00",
        total: "1337.10",
      },
    },
  }
);
```

**Como salvar e voltar:**
- Se estiver usando o `nano`: pressione `Ctrl + X`, digite `Y` (para confirmar) e aperte `Enter`.
- Se estiver usando o `vim`: pressione `Esc` e digite `:wq!`.

Assim que o editor é fechado, o código editado é devolvido para o `mongosh`, onde você precisa apenas apertar **Enter** para executar o comando.

### 5. Saída e Validação
Como pode ser observado na sua imagem, após a execução, o MongoDB tentou encontrar um documento cujo `account_id` fosse `443178` e realizou o `$push` com os novos dados:

```javascript
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
```
*(O `modifiedCount: 1` confirma que o laboratório funcionou e o registro foi atualizado com sucesso!)*
