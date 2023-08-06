const Movie = require('../models/Movie');
const app = require('../app');
const request = require('supertest');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
const moviesData = require('./data/moviesData');
const genresData = require('./data/genresData');
const directorsData = require('./data/directorsData');
const actorsData = require('./data/actorsData');

let initialMovies;

beforeEach(async () => {
    await Movie.truncate({ cascade: true });
    initialMovies = await Movie.bulkCreate(moviesData);
});

test("GET /movies should return 2 movies", async () => {
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toHaveLength(2);
});

test("POST /movies should create a movie", async () => {
    const newMovie = {
        name: "Edward Scissorhands",
        image: "https://amc-theatres-res.cloudinary.com/v1608334213/amc-cdn/production/2/movies/300/337/Poster/p_800x1200_AMC_EdwardScissorhands_En_09252020.jpg",
        synopsis: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea repellat aliquid quam eum incidunt, quos illo eaque explicabo reprehenderit. Quos molestias molestiae laudantium porro ullam non, temporibus maiores officia quia.",
        releaseDate: "1993-10-10"
    }
    await request(app).post('/api/v1/movies').send(newMovie);
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toHaveLength(3);
})

test("DELETE /movies/:id should delete a movie", async () => {
    const id = initialMovies[0].id;
    await request(app).delete(`/api/v1/movies/${id}`);
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toHaveLength(1);
})

test("PUT /movies/:id should update a movie", async () => {
    const update = {
        name: "Pirates updated"
    };
    const id = initialMovies[0].id;
    await request(app).put(`/api/v1/movies/${id}`).send(update);
    const res = await request(app).get(`/api/v1/movies/${id}`);
    expect(res.body.name).toBe("Pirates updated");
})

test("POST /movies/:id/actors set the actors of the movie", async () => {
    const actors = await Actor.bulkCreate(actorsData);
    const actorsIds = actors.map(actor => actor.id);
    const id = initialMovies[0].id;
    await request(app).post(`/api/v1/movies/${id}/actors`).send(actorsIds);
    const res = await request(app).get(`/api/v1/movies/${id}`);
    expect(res.body.actors).toHaveLength(actorsIds.length);
});

test("POST /movies/:id/directors set the directors of the movie", async () => {
    const directors = await Director.bulkCreate(directorsData);
    const directorsIds = directors.map(director => director.id);
    const id = initialMovies[0].id;
    await request(app).post(`/api/v1/movies/${id}/directors`).send(directorsIds);
    const res = await request(app).get(`/api/v1/movies/${id}`);
    expect(res.body.directors).toHaveLength(directorsIds.length);
});

test("POST /movies/:id/genres set the genres of the movie", async () => {
    const genres = await Genre.bulkCreate(genresData);
    const genresIds = genres.map(genre => genre.id);
    const id = initialMovies[0].id;
    await request(app).post(`/api/v1/movies/${id}/genres`).send(genresIds);
    const res = await request(app).get(`/api/v1/movies/${id}`);
    expect(res.body.genres).toHaveLength(genresIds.length);
});
