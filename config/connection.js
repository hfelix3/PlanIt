const sequelize = require('sequelize');
require('dotenv').config();



// DEFINING MODEL
const Sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: '127.0.0.1',
      dialect: 'mysql',
      // TODO: add [socketPath: 'tmp/mysql.sock',] for mac users
      dialectOptions: {
        socketPath: 'tmp/mysql.sock',
        decimalNumbers: true,
      },
    });

module.exports = sequelize;