//TODO: model for data being stored in table
const sequelize = require('../models/appointments');

const appointment = sequelize.define('user', {
    // attribute columns
    name: {
        type: sequelize.STRING
    },
    phoneNumber: {
        type: sequelize.INTEGER
    },
    barber: {
        type: sequelize.STRING
    },
    date: {
        type: sequelize.DATE
    },
    time: {
        type: sequelize.TIME
    },
    
});

module.exports = appointment;