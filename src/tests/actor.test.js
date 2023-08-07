const Actor = require("../models/Actor");
const request = require('supertest');
const app = require('../app');
const actorsData = require("./data/actorsData");
require('../models');

let id;
// beforeEach(async() => {
//     await Actor.truncate({ cascade: true });
//     initialActors = await Actor.bulkCreate(actorsData);
// })
test("GET /actors", async () => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
})
test("POST /actors ", async () => {
  const actor = {
    firstName: "Will",
    lastName: "Smith",
    nationality: "American",
    birthday: "1993-10-10",
    image: "https://url.com"
  }
  // await request(app).post('/api/v1/actors').send(newActor);
  const res = await request(app).post('/actors').send(actor);
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(actor.name);
  expect(res.body.id).toBeDefined();
});
test("PUT /actors/:id", async () => {
  const actorUpdated = {
    firstName: "Johnny updated"
  }
  const res = await request(app).put(`/actors/${id}`).send(artistUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(artistUpdated.name);
});

test('POST /actor/:id/genres', async () => { 
    const genre = await Genre.create({ name: "Fiction" })
    const res = await request(app)
    .post(`/actors/${id}/genres`)
    .send([ genre.id ]);
    await genre.destroy();
     expect(res.status).toBe(200);
     expect(res.body.length).toBe(1); 
 });


test("DELETE /actors/:id", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
})
