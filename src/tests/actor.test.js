const Actor = require("../models/Actor");
const request = require('supertest');
const app = require('../app');
const actorsData = require("./data/actorsData");

let initialActors;


beforeEach(async() => {
    await Actor.truncate({ cascade: true });
    initialActors = await Actor.bulkCreate(actorsData);
})

test("GET /actors should return 2 actors", async() => {
    const res = await request(app).get('/api/v1/actors');
    expect(res.body).toHaveLength(2);
})

test("POST /actors should create an actor", async() => {
    const newActor = {
        firstName: "Morgan",
        lastName: "Freeman",
        nationality: "American",
        birthday: "1993-10-10",
        image: "https://cdn.britannica.com/40/144440-050-DA828627/Morgan-Freeman.jpg"
    }
    await request(app).post('/api/v1/actors').send(newActor);
    const res = await request(app).get('/api/v1/actors');
    expect(res.body).toHaveLength(3);
})

test("DELETE /actors/:id should delete an actor", async () => {
    const id = initialActors[0].id;
    await request(app).delete(`/api/v1/actors/${id}`);
    const res = await request(app).get('/api/v1/actors');
    expect(res.body).toHaveLength(1);
})

test("PUT /actors/:id should update an actor", async () => {
    const update = {
        firstName: "Johnny updated"
    }
    const id = initialActors[0].id;
    await request(app).put(`/api/v1/actors/${id}`).send(update);
    const res = await request(app).get(`/api/v1/actors/${id}`);
    expect(res.body.firstName).toBe("Johnny updated")
})
