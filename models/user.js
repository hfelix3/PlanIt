const sequelize = require('../config/connection');

const user = sequelize.define('user', {
    // attribute columns
    name: {
        type: sequelize.STRING
    },
    phoneNumber: {
        type: sequelize.INTEGER
    },
    username: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    password: {
        type: sequelize. STRING
    },
    
});

module.exports = user;