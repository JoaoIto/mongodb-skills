// Certifique-se de estar conectado ao mongosh antes de colar esses comandos!

// 1. Alterna para o banco de dados alvo (sample_mflix)
use("sample_mflix");

// 2. Comando para inserir o documento do filme 'Free Guy' na coleção 'movies'
db.movies.insertOne({
  "plot": "When Guy, a bank teller, learns that he is a non-player character in a bloodthirsty, open-world video game, he goes on to become the hero of the story and takes the responsibility of saving the world.",
  "genres": ["Comedy", "Action", "Adventure"],
  "runtime": 115,
  "metacritic": 62,
  "rated": "PG-13",
  "cast": ["Ryan Reynolds", "Jodie Comer", "Taika Waititi", "Joe Keery"],
  "poster": "https://a.media-amazon.com/images/I/81wVrggKq4L._SL1500_.jpg",
  "title": "Free Guy",
  "fullplot": "Brimming with optimism and positive energy, single bank teller Guy has spent nearly all his uneventful life wishing he were one of the cool people wearing sunglasses--people who run his town. But, one day, Guy has a chance encounter with mysterious Millie, the woman of his dreams, and just like that, he's on the brink of making an eye-opening, life-altering discovery. Now, to win her heart, all that Guy has to do is take control of his life, one step at a time. And then, out of the blue, Millie decides to drop a bombshell. However, is she telling the truth? Above all, if life is nothing but a game, what will it take for ordinary Guy to level up and get the girl?",
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
});

// 3. Busca o documento recém-inserido para confirmar que ele existe na coleção
db.movies.findOne({ "title": "Free Guy" });
