# MongoDB Shell (mongosh)

O **MongoDB Shell (mongosh)** é um ambiente interativo (REPL) construído em JavaScript (Node.js) que nos permite interagir de forma direta com bancos de dados MongoDB. Com ele, podemos testar consultas, realizar operações de CRUD e administrar o banco de dados via linha de comando.

## Entendendo a Connection String (String de Conexão)

Para que o `mongosh` ou qualquer outra aplicação consiga se comunicar com o seu banco de dados (seja ele local ou hospedado no Atlas), utilizamos uma **Connection String** (String de Conexão). Trata-se de uma URL formatada que contém todas as informações necessárias para a conexão.

A estrutura padrão para conectar a um cluster no Atlas geralmente segue o formato **SRV**:

```text
mongodb+srv://<username>:<password>@<cluster-url>/<database>?<options>
```

### Composição da Connection String

1. **`mongodb+srv://` (Protocolo):** 
   - Define o protocolo de conexão. A inclusão do `+srv` indica que estamos utilizando registros DNS SRV, o que significa que uma única URL de cluster resolve para múltiplos nós do servidor. Isso simplifica bastante a configuração e melhora a disponibilidade.
2. **`<username>:<password>` (Credenciais):** 
   - O usuário do banco de dados e a respectiva senha configurada no MongoDB Atlas (Ex: `myAtlasDBUser:myatlas-001`).
3. **`@<cluster-url>` (Host):** 
   - O endereço exclusivo do seu cluster no Atlas (Ex: `myatlasclusteredu.xxxx.mongodb.net`).
4. **`/<database>` (Default Database):** 
   - (Opcional) Especifica o banco de dados que será aberto por padrão assim que a conexão for estabelecida.
5. **`?<options>` (Parâmetros e Opções):** 
   - Modificadores que ajustam o comportamento da conexão. 
   - Exemplo: `?retryWrites=true&w=majority` assegura que o MongoDB tentará realizar operações de escrita novamente caso haja falhas temporárias na rede e que a escrita seja validada na maioria dos nós (majority).

## Laboratório Prático

Acesse a pasta [lab](./lab/readme.md) para consultar o passo a passo de como instalar o MongoDB Shell em um ambiente Ubuntu e utilizá-lo para conectar ao cluster.

Acesse a pasta [troubleshooting-lab](./troubleshooting-lab/readme.md) para consultar a documentação sobre como resolver problemas comuns de conexão, como Lista de Acesso IP (Network Access) e Erros de Autenticação.

Acesse a pasta [using-mongosh-lab](./using-mongosh-lab/readme.md) para ver como utilizar o `mongosh` para realizar operações de Inserção (`insertOne`) e Busca (`findOne`) em coleções.

Acesse a pasta [js-scripts-lab](./js-scripts-lab/readme.md) para ver como declarar funções interativas JavaScript ou carregar scripts `.js` externos direto no terminal (`load()`).

Acesse a pasta [edit-commands-lab](./edit-commands-lab/readme.md) para aprender a configurar um editor de texto (`config.set("editor", "nano")`) e usar o recurso `edit` para comandos complexos.

---

## 🎓 Conclusão: Connecting to a MongoDB Database Using the MongoDB Shell

Nesta unidade sobre conexão via terminal e uso do MongoDB Shell, você aprendeu a:

* **Define** a connection string and how it is used to connect to a MongoDB cluster.
* **Locate** the connection string for an Atlas cluster.
* **Identify** the basic components of a standard connection string.
* **Install** the MongoDB Shell, or mongosh.
* **Connect** to a local MongoDB instance using mongosh.
* **Connect** to an Atlas cluster using mongosh.
* **Troubleshoot** MongoDB Atlas connection errors (Network e Authentication).
* **Retrieve and insert** a document using mongosh (`insertOne` e `findOne`).
* **Write and use** a JavaScript function inside a mongosh session.
* **Use** the `db.getSiblingDb()` method to change databases within a script.
* **Use** the `load()` method to load and run a JavaScript file in mongosh.
* **Use** an external editor within mongosh (comandos `config` e `edit`).

## 🔗 Resources (Recursos Adicionais)

Utilize os links abaixo para consultar a documentação oficial da MongoDB sobre os temas abordados:

* Docs: Atlas - Get Connection String
* Docs: Connection Strings
* Docs: Install mongosh
* Docs: Connect to a Deployment
* MongoDB Shell Options: Host, Port, Username
* mongodb-js/mongosh (GitHub)
* Docs: Atlas - Troubleshoot Connection Issues
* Perform CRUD Operations in mongosh
* Write Scripts (`db.getSiblingDB()`, `load()` in mongosh)
* Use an Editor for Commands
