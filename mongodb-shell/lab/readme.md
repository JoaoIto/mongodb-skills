# Lab: Installing and Connecting to the MongoDB Shell

In this lab, you will install the MongoDB Shell (`mongosh`) on an Ubuntu virtual machine. Then, you will connect to your Atlas cluster using the MongoDB Shell.

## 📥 Instructions (Ubuntu Environment)

> **Note:** As the user of this container, you have root privileges. This means commands that would normally require `sudo` are not necessary in this lab.

### 1. Verify Prerequisites
To install `mongosh` in an Ubuntu environment, you must have the required `gnupg` package installed on the system. You can verify this by running:

```bash
gpg --version
```

### 2. Import Public Key
Import the public key that's used by the package management system:

```bash
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc
```

### 3. Identify Ubuntu Version
To find out which version of Ubuntu is installed, run:

```bash
cat /etc/os-release
```
*(In this example, the version uses the `VERSION_CODENAME` `jammy`)*.

### 4. Create the List File
Using the codename (`jammy`), create a list file so the Advanced Package Tool (APT) knows where to fetch the MongoDB software:

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### 5. Update and Install
Update your local package index and install `mongosh`:

```bash
apt update
apt install -y mongodb-mongosh
```

### 6. Verify Installation
Ensure that `mongosh` was installed successfully:

```bash
mongosh --version
```

---

## 💻 Resumo dos Comandos (Solved Code)

Para instalar o MongoDB Shell rapidamente no Ubuntu (Jammy), execute sequencialmente:

```bash
wget -qO- https://www.mongodb.org/static/pgp/server-7.0.asc | tee /etc/apt/trusted.gpg.d/server-7.0.asc

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list

apt update

apt install -y mongodb-mongosh
```

## 🍎 / 🪟 Outros Sistemas Operacionais

* **macOS:** Pode ser instalado usando o Homebrew:
  ```bash
  brew install mongosh
  ```
* **Windows:** Você pode fazer o download de um arquivo zip ou utilizar o executável disponível na página de downloads de ferramentas do MongoDB.

---

## 🚀 Parte 2: Conectando ao MongoDB Atlas via mongosh

Após instalar o `mongosh`, você pode se conectar ao seu cluster remoto hospedado no Atlas.

### 1. Estabelecendo a Conexão
Utilize o comando `mongosh` passando a String de Conexão do seu cluster, a versão da API e o seu usuário de banco de dados.

```bash
mongosh "mongodb+srv://myatlasclusteredu.rzk9irm.mongodb.net/" --apiVersion 1 --username myAtlasDBUser
```

Após rodar o comando, o terminal solicitará a sua senha (no seu caso, `myatlas-001`). O texto não aparecerá enquanto você digita (por segurança). Pressione `Enter`.

### 2. Navegando no mongosh
Assim que a conexão for estabelecida com sucesso, o prompt mudará para algo como:
`Atlas atlas-61n33e-shard-0 [primary] test>`

Você agora está dentro do Shell do MongoDB interativo.

### 3. Visualizando Bancos de Dados
Para confirmar que você tem acesso aos bancos de dados do seu cluster, incluindo o `mflix_merchandise` que foi criado no laboratório de UI, rode o comando:

```javascript
show dbs
```

Isso listará todos os bancos disponíveis, além de seus tamanhos. Exemplo de saída:
```text
mflix_merchandise     72.00 KiB
sample_airbnb         58.10 MiB
sample_mflix         113.80 MiB
...
```

### 4. Encerrando a Sessão
Quando terminar, você pode fechar o `mongosh` e voltar para o seu terminal padrão (Ubuntu) digitando:

```javascript
exit
```
