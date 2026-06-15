# Lab: Using the MongoDB Shell (Insert and Retrieve Documents)

Neste laboratório, o objetivo é praticar operações básicas de manipulação de dados (CRUD) diretamente pela linha de comando, utilizando o **MongoDB Shell (mongosh)**. O foco está na inserção (Insert) e recuperação (Retrieve) de documentos em uma coleção.

---

## 📥 Instruções do Laboratório

A atividade propõe que você insira um novo filme ("Free Guy") na coleção `movies` do banco de dados `sample_mflix` e, em seguida, faça uma busca para validar que a inserção ocorreu com sucesso.

### 1. Inserindo o Documento (`insertOne`)
Com o `mongosh` aberto e conectado ao seu cluster, utilize o método `insertOne()` na coleção `movies`. O comando recebe um documento JSON contendo os detalhes do filme.

```javascript
db.movies.insertOne({
  "plot": "When Guy, a bank teller, learns that he is a non-player character in a bloodthirsty, open-world video game...",
  "genres": ["Comedy", "Action", "Adventure"],
  "runtime": 115,
  "metacritic": 62,
  "rated": "PG-13",
  "cast": ["Ryan Reynolds", "Jodie Comer", "Taika Waititi", "Joe Keery"],
  "poster": "https://a.media-amazon.com/images/I/81wVrggKq4L._SL1500_.jpg",
  "title": "Free Guy",
  "fullplot": "Brimming with optimism and positive energy...",
  "languages": ["English", "Japanese", "German"],
  "released": { "$date": "2021-08-13T00:00:00.000Z" },
  "directors": ["Shawn Levy"],
  "writers": ["Matt Lieberman", "Zak Penn"],
  "awards": { "wins": 1, "nominations": 9, "text": "1 win & 9 nominations." },
  "year": 2021,
  "imdb": { "rating": 7.1, "votes": 439000 },
  "countries": ["Canada", "USA"],
  "type": "movie",
  "num_mflix_comments": 0
})
```

**Saída no Terminal:**
O servidor confirmará a gravação e informará o `_id` único gerado. Exemplo baseado na sua execução:
```javascript
{
  acknowledged: true,
  insertedId: ObjectId('6a2bfd555a1f9279bb8ce5b0')
}
```

### 2. Recuperando o Documento (`findOne`)
Para comprovar que o filme foi salvo, executamos uma consulta passando um filtro pelo campo `title`. O comando `findOne()` retornará o primeiro documento que satisfizer o critério estabelecido.

*Nota: Se você rodar com a string vazia `<Movie title>`, o retorno será `null`.*

```javascript
db.movies.findOne({ title: "Free Guy" })
```

**Saída no Terminal:**
O próprio documento recém inserido será impresso no seu terminal, confirmando o sucesso da operação:
```javascript
{
  _id: ObjectId('6a2bfd555a1f9279bb8ce5b0'),
  plot: 'When Guy, a bank teller, learns that he is a non-player character in a bloodthirsty, open-world video game, he goes on to become the hero of the story and takes the responsibility of saving the world.',
  genres: [ 'Comedy', 'Action', 'Adventure' ],
  runtime: 115,
  metacritic: 62,
  rated: 'PG-13',
  cast: [ 'Ryan Reynolds', 'Jodie Comer', 'Taika Waititi', 'Joe Keery' ],
  poster: 'https://a.media-amazon.com/images/I/81wVrggKq4L._SL1500_.jpg',
  title: 'Free Guy',
  fullplot: 'Brimming with optimism and positive energy, single bank teller Guy has spent nearly all his uneventful life wishing he were one of the cool people wearing sunglasses--people who run his town. But, one day, Guy has a chance encounter with mysterious Millie, the woman of his dreams, and just like that, he's on the brink of making an eye-opening, life-altering discovery. Now, to win her heart, all that Guy has to do is take control of his life, one step at a time. And then, out of the blue, Millie decides to drop a bombshell. However, is she telling the truth? Above all, if life is nothing but a game, what will it take for ordinary Guy to level up and get the girl?',
  languages: [ 'English', 'Japanese', 'German' ],
  released: { '$date': '2021-08-13T00:00:00.000Z' },
  directors: [ 'Shawn Levy' ],
  writers: [ 'Matt Lieberman', 'Zak Penn' ],
  awards: { wins: 1, nominations: 9, text: '1 win & 9 nominations.' },
  year: 2021,
  imdb: { rating: 7.1, votes: 439000 },
  countries: [ 'Canada', 'USA' ],
  type: 'movie',
  num_mflix_comments: 0
}
```

---

## 💻 Arquivo de Comandos (Terminal)

Na pasta deste laboratório você encontrará o arquivo **`insert_and_find.js`**. 
Ele contém exatamente as instruções acima formatadas como script JS. Você pode copiá-las e colá-las diretamente no terminal do seu `mongosh` para que o MongoDB execute as inserções e a busca instantaneamente.
