const Sequelize = require('../config/connection');

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

module.exports = user;