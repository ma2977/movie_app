const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const Actor = require('./Actor');
const Director = require('./Director');
const Genre = require('./Genre');

const Movie = sequelize.define('movie', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});

Movie.belongsToMany(Actor, { through: "movieActors" });
Actor.belongsToMany(Movie, { through: "movieActors" });

Movie.belongsToMany(Director, { through: "movieDirectors" });
Director.belongsToMany(Movie, { through: "movieDirectors" });

Movie.belongsToMany(Genre, { through: "movieGenres" });
Genre.belongsToMany(Movie, { through: "movieGenres" });

module.exports = Movie;
