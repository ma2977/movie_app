const { getAll, create, getOne, remove, update, movieActors, movieDirectors, movieGenres } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(movieActors)

movieRouter.route('/:id/directors')
    .post(movieDirectors)

movieRouter.route('/:id/genres')
    .post(movieGenres)

module.exports = movieRouter;