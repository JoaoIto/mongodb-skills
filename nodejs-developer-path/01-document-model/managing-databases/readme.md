# Managing Databases, Collections, and Documents in Atlas

Nesta seção, exploramos como gerenciar as entidades fundamentais do MongoDB no ambiente em nuvem: o MongoDB Atlas.

## Hierarquia de Dados no MongoDB

1. **Database (Banco de Dados):** É um contêiner físico para coleções. Um cluster pode conter múltiplos bancos de dados.
2. **Collection (Coleção):** É um grupo de documentos do MongoDB. É o equivalente a uma tabela em um banco de dados relacional (RDBMS). Uma coleção existe dentro de um único banco de dados.
3. **Document (Documento):** Um conjunto de pares de chaves e valores no formato BSON. É a unidade básica de dados (como uma linha ou registro).

## Gerenciamento via Atlas

O MongoDB Atlas é o banco de dados como serviço (DBaaS) totalmente gerenciado. Nele podemos:
- Criar e gerenciar Clusters (conjuntos de servidores).
- Configurar autenticação, usuários de banco de dados e permissões (RBAC).
- Listar, criar e excluir bancos de dados e coleções pela interface gráfica (Data Explorer).
- Inserir, editar e deletar documentos facilmente via Web.
- Monitorar a performance e uso de armazenamento de cada banco de dados.

Veja a pasta `lab` para um laboratório prático de conexão do ambiente local com o MongoDB Atlas.

---

## 📝 Prática (Quiz)

**Pergunta:** In Atlas, how do you perform a simple query to find specific data? (No Atlas, como você executa uma consulta simples para encontrar dados específicos?)

* **A.** Select the Browse Collections option.
* **B.** View your data in table format.
* **C.** It isn't possible to perform a simple query in Atlas.
* **D. Enter field-value pairs in the filter bar on the Collections tab. (Correta)**

**Explicação:** 
Para buscar um documento específico diretamente pela interface (UI) do MongoDB Atlas, você deve acessar a aba de **Collections**, selecionar a coleção desejada e utilizar a barra de filtro (Filter bar). Na barra de filtro, você insere um documento JSON com os pares de `campo: valor` (field-value pairs) correspondentes aos dados que você deseja encontrar (ex: `{"item": "mflix trucker cap"}`).
