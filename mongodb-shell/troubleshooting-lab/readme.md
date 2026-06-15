# Lab: Troubleshooting Connection Errors

Neste laboratório prático, abordamos dois dos problemas mais comuns ao tentar se conectar a um cluster do MongoDB Atlas: erros de **Network Access** (Lista de IPs permitidos) e erros de **Autenticação** (Credenciais incorretas).

---

## 🛠️ Parte 1: Troubleshoot Network Access Errors (Lista de IPs)

Por razões de segurança, o MongoDB Atlas bloqueia todas as conexões externas por padrão. Para conseguir conectar via `mongosh` ou pela sua aplicação, o seu endereço IP atual precisa estar na **Network Access List** do Atlas.

### 1. O Problema (O Erro)
Ao tentar conectar ao banco com o comando padrão:

```bash
mongosh "mongodb+srv://myatlasclusteredu.rzk9irm.mongodb.net" --username myAtlasDBUser --password myatlas-001
```

Você pode se deparar com o seguinte erro (que demora até 30 segundos para retornar):
> `MongoServerSelectionError: ... SSL alert number 80. It looks like this is a MongoDB Atlas cluster. Please ensure that your Network Access List allows connections from your IP.`

### 2. A Solução
Existem duas formas principais de resolver isso adicionando o seu IP à *Whitelist* (Lista de permissões):

**Opção A (Pela Interface do Atlas - UI):**
1. Vá até a seção **Network Access** no menu lateral do Atlas.
2. Clique no botão **Add IP Address**.
3. Insira o IP desejado (no laboratório foi utilizado o IP fornecido `34.10.28.17`).
4. Confirme e aguarde o status mudar de "Pending" para "🟢 Active".

**Opção B (Usando o Atlas CLI - Mais Rápido):**
No próprio terminal do laboratório (caso o Atlas CLI esteja instalado), basta executar:
```bash
atlas accessList create --currentIp
```
*Saída esperada: `Created a new IP access list.`*

### 3. Validação
Após garantir que o IP foi liberado, você pode rodar um comando rápido de "ping" pelo próprio `mongosh` sem precisar abrir a interface interativa, utilizando a flag `--eval`:

```bash
mongosh "mongodb+srv://myatlasclusteredu.rzk9irm.mongodb.net" \
  --username myAtlasDBUser \
  --password myatlas-001 \
  --eval "db.adminCommand({ ping: 1 })"
```

*Saída de sucesso:*
```json
{ "ok" : 1 }
```

---

## 🔑 Parte 2: Troubleshoot Authentication Errors

Outro problema frequente é errar o usuário ou a senha ao montar a String de Conexão.

### 1. O Problema (O Erro)
Se você inserir um usuário incorreto (ou um usuário que não tem acesso àquele banco de dados específico) ou digitar a senha errada, o servidor negará a conexão retornando erros de autenticação (ex: `Authentication failed`).

### 2. A Solução
1. Certifique-se de usar o nome de usuário correto (no caso do lab, `myAtlasDBUser`).
2. Se a senha contiver caracteres especiais como `@`, `:`, `/`, eles devem ser convertidos (URL Encoded). No nosso caso, a senha `myatlas-001` é simples e pode ser passada de forma direta.

### 3. Validação
Para confirmar que o problema de autenticação foi resolvido, execute a conexão normalmente passando usuário e senha e verifique se o prompt `Atlas atlas-... [primary] test>` é exibido no terminal.

```bash
mongosh "mongodb+srv://myatlasclusteredu.rzk9irm.mongodb.net" --username myAtlasDBUser --password myatlas-001
```
