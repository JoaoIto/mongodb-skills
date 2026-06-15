# Lab: Atlas Search na Prática

Este laboratório acompanha o módulo **10. Introduction to Atlas Search** e fornece os scripts em Node.js equivalentes aos comandos `$search` que estudamos, permitindo testar nativamente a busca no banco de dados.

## Como funciona?
O Atlas Search roda sobre um processo paralelo chamado `mongot` usando o motor do Apache Lucene. Para conseguirmos rodar buscas Textuais ricas usando os scripts deste laboratório, primeiro precisamos de um **Search Index** criado na base. 

## Pré-requisitos
1. Você precisa ter carregado o banco de dados de testes `sample_mflix` (o dataset gratuito padrão fornecido nos clusters do MongoDB Atlas).
2. Vá até o seu cluster do Atlas, navegue até a aba **"Atlas Search"**, clique em **Create Search Index** e crie os 3 índices abaixo para a coleção `movies` no banco `sample_mflix` usando o mapeamento via JSON:

   * **Índice 1:** Nome `plotIndex`
   ```json
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "plot": { "type": "string" }
       }
     }
   }
   ```

   * **Índice 2:** Nome `plotReleasedIndex` (Usado pelos testes de equals, near, range)
   ```json
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "plot": { "type": "string" },
         "released": { "type": "date" }
       }
     }
   }
   ```

   * **Índice 3:** Nome `genresFacetedIndex` (Usado pelos testes de Facetas)
   ```json
   {
     "mappings": {
       "dynamic": false,
       "fields": {
         "genres": { "type": "stringFacet" },
         "released": { "type": "date" }
       }
     }
   }
   ```
   * *Aguarde o status de todos ficar como "Active".*

## Como Executar
1. Instale o driver do mongodb:
   ```bash
   npm install
   ```

2. Insira a sua *Connection String* no arquivo `app.js` substituindo a variável `uri`.

3. Execute o script no terminal para ver as buscas por texto e metadados rodarem na prática:
   ```bash
   node app.js
   ```

> **Nota:** Como os índices de busca são mantidos pelo `mongot`, criar e sincronizar índices programaticamente via Node pode ser assíncrono. Por isso a recomendação oficial é sempre instanciar seus Search Indexes via Atlas UI ou Atlas CLI antes de rodar os scripts de consultas.
