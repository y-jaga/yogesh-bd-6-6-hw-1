const express = require('express');
const cors = require('cors');
const { getAllMovies, getMoviesById } = require('./controllers/index');
const app = express();

app.use(express.json());
app.use(cors());

//Exercise 1: Retrieve All Movies
//API Call: http://localhost:3000/movies

app.get('/movies', async (req, res) => {
  let movies = await getAllMovies();

  res.json({ movies });
});

//Exercise 2: Retrieve Movie by ID
//API Call: http://localhost:3000/movies/details/1

app.get('/movies/details/:id', async (req, res) => {
  let movie = await getMoviesById(parseInt(req.params.id));

  res.json({ movie });
});

module.exports = { app };
