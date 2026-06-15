# Lab: Connecting to an Atlas Cluster in Node.js Applications

Neste laboratório, o objetivo é realizar a conexão programática de uma aplicação Node.js ao MongoDB Atlas utilizando o driver oficial (`mongodb`) e instanciando um objeto `MongoClient`.

## 💻 Código de Conexão

O script desenvolvido no laboratório faz o seguinte:
1. Importa a classe `MongoClient` do pacote `mongodb`.
2. Define a String de Conexão (`uri`).
3. Instancia o `MongoClient`.
4. Declara uma função assíncrona `listDatabases` para rodar um comando administrativo que lista os bancos do cluster.
5. Usa uma função `main()` para estabelecer a conexão `.connect()`, invocar a listagem e em seguida fechar a conexão graciosamente com o `.close()`.

Para praticar, você pode rodar esse código usando o Node.js:
*(Certifique-se de substituir `<user>`, `<password>` e `<cluster>` pelas suas credenciais reais do Atlas).*

### Estrutura do `app.js`

Na mesma pasta deste arquivo, deixamos o código base gerado na aula: [app.js](./app.js).

Se você for rodá-lo localmente na sua máquina, lembre-se de inicializar o projeto primeiro:
```bash
npm init -y
npm install mongodb
node app.js
```
