const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Director = require('../models/Director');
const Actor = require('../models/Actor');
const Genre = require('../models/Genre');

const includeAll = [
    {
        model: Director,
        through: {attributes: []}
    },
    {
        model: Actor,
        through: {attributes: []}
    },
    {
        model: Genre,
        through: {attributes: []}
    },
]

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: includeAll});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {include: includeAll});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const movieActors = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setActors(req.body);
    return res.json(await movie.getActors());
});

const movieDirectors = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setDirectors(req.body);
    return res.json(await movie.getDirectors());
});

const movieGenres = catchError(async(req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    await movie.setGenres(req.body);
    return res.json(await movie.getGenres());
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    movieActors,
    movieDirectors,
    movieGenres
}