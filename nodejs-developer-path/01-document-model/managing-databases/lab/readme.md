# Lab: Managing Databases, Collections, and Documents in Atlas

## 📥 Instructions

Welcome João! In this lab you will authenticate using a verification code from the terminal to associate your existing Atlas account to this lab session.

In the terminal, if you are asked to choose an authentication type, please select "UserAccount" by using the down arrow key and then press "Enter". If terminal instead shows a verification code, you are all set to move to the next step.

> **Note**: If you selected an authentication type other than "UserAccount", reload the window.

1. Copy the verification code in the terminal tab by highlighting it and then clicking it.
2. Click the link `https://account.mongodb.com/account/connect` to open a browser to Atlas to authenticate.
3. Paste the verification code from the terminal output in the terminal tab. Note that the verification code times out after 10 minutes.
4. To connect your lab session and your Atlas account, click the **Confirm authorization** button.
5. Once you have authenticated in the MongoDB Atlas webpage, return to this lab in your browser.

The `atlas auth login` command displays the following message when successfully authenticated:
```shell
Successfully logged in as user@example.com.
Select one default organization and one default project.
```

6. Prompt for organization: Always select `"MY_MDB_ORG"`.
> **Note**: If you don't see the `"MY_MDB_ORG"`, select ANY organization. Select `No` to "Do you want to enter the Organization ID manually?" and `No` to "Project ID manually?".

7. Prompt for default output format: Select `plaintext`.
8. Once completed, select the **Check** button in the lab environment.

## 🛠️ Cluster Details for this Lab

This lab configuration relies on a free-tier cluster:
- **Organization name**: `MY_MDB_ORG`
- **Project name**: `MDB_EDU`
- **Cluster name**: `myAtlasClusterEDU`
- **Database user**: `myAtlasDBUser`
- **Password**: `myatlas-001`
- **Permissions**: `readWriteAnyDatabase`

---

## 💻 Prática com Node.js

Para executar a conexão com este cluster usando Node.js, foi criado um script no arquivo `index.js`.
Certifique-se de executar `npm install` nesta pasta antes de rodar o código.
Para rodar, utilize o comando:

```bash
node index.js
```

---

## 🖥️ Managing Databases, Collections, and Documents Using the Atlas UI

Nesta parte do laboratório, utilizamos a interface gráfica (UI) do Atlas para criar um banco de dados, uma coleção, e inserir um documento.

### Passos Realizados no Atlas UI:

1. Acessamos a página do cluster `myAtlasClusterEDU` através da organização `MY_MDB_ORG` e projeto `MDB_EDU`.
2. Navegamos até a aba **Collections** (ou botão **Browse Collections**).
3. Criamos um banco de dados e uma coleção:
   - **Database Name:** `mflix_merchandise`
   - **Collection Name:** `swag`
4. Selecionamos a coleção `swag` recém-criada e clicamos em **Insert Document**.
5. No editor em modo **JSON**, inserimos o seguinte documento:

```json
{
    "item": "mflix trucker cap",
    "msrp": 41.99,
    "manufacturer": "Old Era Caps",
    "colors": ["Red", "White", "Black"],
    "adjustable": true,
    "description": "Official MFLIX trucker cap as seen worn by MFLIX celebs all over the world."
}
```

### Validação via mongosh

Para confirmar que os dados foram inseridos com sucesso pelo Atlas UI, retornamos ao terminal interativo `mongosh` no ambiente de laboratório e executamos a seguinte consulta:

```javascript
db.swag.findOne({"item": "mflix trucker cap"})
```

Este comando buscou e retornou o documento do "mflix trucker cap" validando nossa inserção. Ao final, confirmamos a atividade clicando em **Check**.
