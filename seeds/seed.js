const sequelize = require('../config/connection');

const user = require('../models/user');
const appointment = require('../models/appointments');
const employee = require('../models/employee');

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
        {
            name: 'Alex Johnson',
            phoneNumber: '555-555-5555',
            username: 'ajohnson',
            email: 'ajohnson@gmail.com',
            password: 'password123'
        },
        {
            name: 'Emily Wilson',
            phoneNumber: '555-555-5555',
            username: 'ewilson',
            email: 'ewilson@gmail.com',
            password: 'password123'
        },
        {
            name: 'Michael Brown',
            phoneNumber: '555-555-5555',
            username: 'mbrown',
            email: 'mbrown@gmail.com',
            password: 'password123'
        },
        {
            name: 'Olivia Davis',
            phoneNumber: '555-555-5555',
            username: 'odavis',
            email: 'odavis@gmail.com',
            password: 'password123'
        },
        {
            name: 'William Martinez',
            phoneNumber: '555-555-5555',
            username: 'wmartinez',
            email: 'wmartinez@gmail.com',
            password: 'password123'
        },
        {
            name: 'Sophia Anderson',
            phoneNumber: '555-555-5555',
            username: 'sanderson',
            email: 'sanderson@gmail.com',
            password: 'password123'
        },
        {
            name: 'James Thompson',
            phoneNumber: '555-555-5555',
            username: 'jthompson',
            email: 'jthompson@gmail.com',
            password: 'password123'
        },
        {
            name: 'Ava Harris',
            phoneNumber: '555-555-5555',
            username: 'aharris',
            email: 'aharris@gmail.com',
            password: 'password123'
        },
        {
            name: 'Benjamin Clark',
            phoneNumber: '555-555-5555',
            username: 'bclark',
            email: 'bclark@gmail.com',
            password: 'password123'
        },
        {
            name: 'Mia Lewis',
            phoneNumber: '555-555-5555',
            username: 'mlewis',
            email: 'mlewis@gmail.com',
            password: 'password123'
        },
    ], {
        individualHooks: true,
        returning: true,
    });

    for (const user of users) {
        await appointment.create({
            barber_id: Math.floor(Math.random() * 3) + 1,
            dateTime: getRandomDate(),
            customer_id: user.id,
        });
    };

    await employee.bulkCreate([
        {
            name: 'Jack',
            phoneNumber: '555-5555',
        },
        {
            name: 'Jennifer',
            phoneNumber: '555-555-5555',
        },
        {
            name: 'Frank',
            phoneNumber: '555-555-5555',
        }
    ], {
        individualHooks: true,
        returning: true,
    });
};

function getRandomDate() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const randomDay = Math.floor(Math.random() * 28) + 1; // Assuming 28 days in a month

    const randomHour = Math.floor(Math.random() * 24);
    const randomMinute = Math.floor(Math.random() * 2) * 30; // 0 or 30

    return new Date(currentYear, currentMonth, randomDay, randomHour, randomMinute);
}


module.exports = seedDatabase;