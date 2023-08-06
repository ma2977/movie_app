const Genre = require('../models/Genre');
const request = require('supertest');
const app = require('../app');
const genresData = require('./data/genresData');

let initialGenres;

beforeEach(async () => {
    await Genre.truncate({ cascade: true });
    initialGenres = await Genre.bulkCreate(genresData);
})

test("GET /genres should return 2 genres", async () => {
    const res = await request(app).get('/api/v1/genres');
    expect(res.body).toHaveLength(2);
}) 

test("POST /genres should create a genre", async () => {
    const newGenre = { name: "Adventure" }
    await request(app).post('/api/v1/genres').send(newGenre);
    const res = await request(app).get('/api/v1/genres');
    expect(res.body).toHaveLength(3);
})

test("DELETE /genres/:id should delete a genre", async () => {
    const id = initialGenres[0].id;
    await request(app).delete(`/api/v1/genres/${id}`);
    const res = await request(app).get('/api/v1/genres');
    expect(res.body).toHaveLength(1);
})

test("PUT /genres/:id should update a genre", async () => {
    const genre = { name: "Action updated" }
    const id = initialGenres[0].id;
    await request(app).put(`/api/v1/genres/${id}`).send(genre);
    const res = await request(app).get(`/api/v1/genres/${id}`);
    expect(res.body.name).toBe("Action updated")
})
