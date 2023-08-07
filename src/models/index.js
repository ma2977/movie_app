const Actor = require('./Actor');
const Genre = require ('./Genre');
const Movie = require('./Movie');

Actor.belongsToMany(Genre, {through: ActorsGenres});
Genre.belongsToMany(Actor, {through: ActorsGenres});

Movie.belongsTo(Actor);
Actor.hasMany(Movie);