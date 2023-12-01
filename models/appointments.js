//TODO: model for data being stored in table
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../models/appointments');

class appointment extends Model {}

appointment.init(
    {
        // primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
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
    },
    {
        sequelize, 
        timestamps: false,
        // Prevent sequelize from renaming the table
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment'
    }
);

module.exports = appointment;