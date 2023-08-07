const Genre = require('../models/Genre');
const request = require('supertest');
const app = require('../app');
const genresData = require('./data/genresData');

let id;
let initialGenres;

// beforeEach(async () => {
//     await Genre.truncate({ cascade: true });
//     initialGenres = await Genre.bulkCreate(genresData);
// })

test("GET /genres", async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
}); 

test("POST /genres", async () => {
    const genre = { name: "Rock" }
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect (res.status).toBe(201);
    expect(res.body.name).toBe(genre.name);
});

test("PUT /genres/:id", async () => {
    const genreUpdated = { name: "Rock updated" }
    const res = await request(app).put(`/genres/${id}`).send(genreUpdated);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genreUpdated.name);
});

test("DELETE /genres/:id", async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});