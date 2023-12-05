const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./user');


class Appointment extends Model {}

Appointment.init(
    {
        // primary key
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
          },
        barber_id: {
            type: DataTypes.STRING
        },
        dateTime: {
            type: DataTypes.DATE
        },
    },
    {
        sequelize, 
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointment'
    }
);

Appointment.belongsTo(User, {
    foreignKey: 'customer_id'
});

module.exports = Appointment;