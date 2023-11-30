const Sequelize = require('sequelize');
const sequelize = require('../server.js');

// to initiate sequelize
const sequelize = new sequelize();

const user = sequelize.define('user', {
    // attribute columns
    name: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    phoneNumber: {
        type: sequelize.INTEGER
    },
    
});

// C.R.U.D. OPERATIONS
    // Create 
    user.create({
        username: '',
        email: ''  
      });
      
      // Read
      user.findAll(); 
      
      // Update
      user.update({ email: '' }, { where: { id: 1 }});
      
      // Delete
      user.destroy({ where: { id: 1 }});

      module.exports = user;