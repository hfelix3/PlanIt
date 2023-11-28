require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.TZ

module.exports = sequelize;