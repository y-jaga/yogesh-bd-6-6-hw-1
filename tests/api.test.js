const request = require('supertest');
const http = require('http');
const { app } = require('../index');
const { getAllMovies } = require('../controllers/index');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getAllMovies: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controllers Function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Movies Function
  it('should return all movies', () => {
    let mockedMovies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont',
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola',
      },
    ];

    getAllMovies.mockReturnValue(mockedMovies);
    const result = getAllMovies();
    expect(result).toEqual(mockedMovies);
    expect(result.length).toBe(3);
  });
});

describe('API endpoint testing.', () => {
  //Exercise 3: Test Retrieve All Movies
  it('GET /movies endpoint retrieves all movie.', async () => {
    const res = await request(server).get('/movies');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movies: [
        {
          movieId: 1,
          title: 'Inception',
          genre: 'Sci-Fi',
          director: 'Christopher Nolan',
        },
        {
          movieId: 2,
          title: 'The Shawshank Redemption',
          genre: 'Drama',
          director: 'Frank Darabont',
        },
        {
          movieId: 3,
          title: 'The Godfather',
          genre: 'Crime',
          director: 'Francis Ford Coppola',
        },
      ],
    });
    expect(res.body.movies.length).toBe(3);
  });

  //Exercise 4: Test Retrieve Movie by ID
  it('GET /movies/details/:id endpoint retrieves a movie by ID.', async () => {
    const res = await request(server).get('/movies/details/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      movie: {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan',
      },
    });
  });
});
