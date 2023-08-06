const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL ,{
    dialect: 'postgres', // Replace 'postgres' with the appropriate dialect you are using (e.g., 'mysql', 'sqlite')
  });

module.exports = sequelize;
