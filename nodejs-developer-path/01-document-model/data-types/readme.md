# Data Types in MongoDB

O MongoDB suporta diversos tipos de dados (Data Types) nativos do BSON, o que permite armazenar informações de maneira rica e otimizada.

## Principais Tipos de Dados

1. **String:** O tipo de dados mais comum, usado para armazenar texto. Deve ser UTF-8 válido.
2. **Integer (Int32 e Int64):** Utilizado para armazenar números inteiros. Dependendo do servidor, pode ser de 32 bits ou 64 bits.
3. **Double:** Usado para armazenar valores de ponto flutuante (números decimais).
4. **Boolean:** Utilizado para armazenar valores lógicos `true` ou `false`.
5. **Array:** Permite armazenar listas ou múltiplos valores em uma única chave. Exemplo: `["valor1", "valor2"]`.
6. **Object (Sub-documento):** Permite incorporar documentos dentro de outros documentos (relações "has-a" ou aninhamento).
7. **Date:** Usado para armazenar a data ou a hora atual no formato UNIX time (milissegundos desde a epoch).
8. **ObjectId:** Um identificador único, gerado automaticamente para o campo `_id` se não for especificado explicitamente. Consiste em 12 bytes.
9. **Null:** Usado para representar valores nulos ou campos vazios.

## Por que os Tipos de Dados Importam?

* **Validação:** Garantem a consistência e a integridade da base de dados (junto ao Schema Validation).
* **Consultas:** Alguns operadores de busca dependem do tipo de dado correto (ex: buscar datas maiores que hoje, ou ordenar números).
* **Armazenamento:** Tipos diferentes consomem diferentes quantidades de espaço em disco (Int32 vs Int64).
