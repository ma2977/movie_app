const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const directorRoutes = express.Router();

directorRoutes.route('/')
    .get(getAll)
    .post(create);

directorRoutes.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directorRoutes;