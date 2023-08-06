const express = require('express');
const actorRouter = require('./actor.routes');
const directorRoutes = require('./director.routes');
const genreRouter = require('./genre.routes');
const movieRouter = require('./movie.routes');
const router = express.Router();

// colocar las rutas aquí
router.use('/genres', genreRouter);
router.use('/directors', directorRoutes);
router.use('/actors', actorRouter);
router.use('/movies', movieRouter);

module.exports = router;
