# Lab: Aggregation Pipeline no Node.js

Este laboratório demonstra como criar e executar um pipeline de agregação usando o driver do MongoDB para Node.js. O Aggregation Framework é a ferramenta ideal para processamento em lote de dados e resumos (como agrupar valores, somar campos e filtrar antes do retorno).

## Estrutura do Lab

O arquivo `app.js` conecta-se à coleção de códigos postais (`zips`) (presente nativamente nos *Sample Datasets* do Atlas) e executa um pipeline para responder a seguinte pergunta: **Quantos Zips únicos existem por Cidade em um Estado específico (NY)?**

O pipeline executado possui os seguintes estágios:
1. **`$match`**: Filtra apenas documentos que pertencem ao estado de `"NY"`.
2. **`$group`**: Agrupa os documentos filtrados utilizando o nome da cidade (`$city`) como chave de agrupamento `_id`. Ao mesmo tempo, utiliza o acumulador `$count` para totalizar os CEPs (zips).
3. **`$sort`** (Opcional): Organiza o retorno de forma descendente, ou seja, as cidades com mais Zips primeiro.
4. **`$limit`** (Opcional): Retorna apenas os 5 primeiros resultados para facilitar a leitura no console.
5. **`$set`**: Adiciona ou modifica campos no documento (neste caso adiciona o `estado_formatado`).
6. **`$project`**: Remodela o documento final, escolhendo quais campos exibir (`1` ou `0`), e permite renomear variáveis (como mapear `_id` para `cidade`).

Adicionalmente, há um segundo pipeline exclusivo para demonstrar o estágio **`$count`**, que retorna um único documento contendo a contagem total de itens que passaram por ele.

Por fim, o terceiro pipeline demonstra o uso do estágio **`$out`**. Este estágio é sempre o último a ser chamado, pois ele pega os resultados processados da agregação e salva-os diretamente no banco de dados em uma nova coleção (neste lab, `ny_city_zips_summary`). Cuidado: se a coleção de destino já existir, o `$out` a sobrescreverá completamente!

O retorno do comando `.aggregate()` não é um array comum, mas um **Cursor**. Por isso, usamos um loop assíncrono `for await (...)` para iterar e exibir os resultados de maneira otimizada, consumindo poucos recursos de memória.

## Como executar o código

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Atualize as Credenciais:
   Abra o arquivo `app.js` e substitua a variável `uri` pela sua *Connection String* real do MongoDB Atlas. Lembre-se de ter carregado os *Sample Datasets* no seu cluster.

3. Execute no terminal:
   ```bash
   node app.js
   ```
