const Director = require('../models/Director');
const request = require('supertest');
const app = require('../app');
const directorsData = require('./data/directorsData');
const supertest = require('supertest');
let initialDirectors;
beforeEach(async () => {
  await Director.truncate({ cascade: true });
  initialDirectors = await Director.bulkCreate(directorsData);
});
test("GET /directors should return 2 directors", async () => {
  const res = await request(app).get('/api/v1/directors');
  expect(res.body).toHaveLength(2);
})
test("POST /directors should create a director", async () => {
  const newDirector = {
    firstName: "Tim",
    lastName: "Burton",
    nationality: "American",
    birthday: "1993-10-10",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Tim_Burton_Frankenweenie_2012_3.jpg"
  }
  await request(app).post('/api/v1/directors').send(newDirector);
  const res = await request(app).get('/api/v1/directors');
  expect(res.body).toHaveLength(3);
})
test("DELETE /directors/:id should delete a director", async () => {
  const id = initialDirectors[0].id;
  await request(app).delete(`/api/v1/directors/${id}`);
  const res = await request(app).get('/api/v1/directors');
  expect(res.body).toHaveLength(1);
})
test("PUT /directors/:id should update a director", async () => {
  const update = {
    firstName: "Gore updated"
  }
  const id = initialDirectors[0].id;
  await request(app).put(`/api/v1/directors/${id}`).send(update);
  const res = await request(app).get(`/api/v1/directors/${id}`);
  console.log(res.body)
  expect(res.body.firstName).toBe("Gore updated");
})
