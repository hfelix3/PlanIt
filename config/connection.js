const Sequelize = require('sequelize');
require('dotenv').config();



// DEFINING MODEL
const sequelize = process.env.JAWSDB_URL
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

// C.R.U.D. OPERATIONS
    // Create 
User.create({
  username: '',
  email: ''  
});

// Read
User.findAll(); 

// Update
User.update({ email: '' }, { where: { id: 1 }});

// Delete
User.destroy({ where: { id: 1 }});


module.exports = sequelize;