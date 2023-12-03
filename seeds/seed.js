const sequelize = require('../config/connection');

const user = require('../models/user');
const appointment = require('../models/appointments');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await user.bulkCreate([
        {
            name: 'John Smith',
            phoneNumber: '555-5555',
            username: 'jsmith',
            email: 'jsmith@gmail.com',
            password: 'password123'
        },
        {
            name: 'Jane Doe',
            phoneNumber: '555-555-5555',
            username: 'jdoe',
            email: 'jdoe@gmail.com',
            password: 'password123'
        },
    ], {
        individualHooks: true,
        returning: true,
    });

    for (const user of users) {
        await appointment.create({
            barber: 'John',
            dateTime: getRandomDate(),
            customer_id: user.id,
        });
    };
};

function getRandomDate() {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
    return new Date(currentYear, currentMonth, randomDay);
}

module.exports = seedDatabase;