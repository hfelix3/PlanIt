// TODO: Have both GET and POST routes for retrieving and adding new data FOR appointments.
const router = require('express').Router();
const appointment = require('../../models/appointments.js');
const User = require('../../models/user.js');

router.get('/', async (req, res) => {
  try {
    const appointmentData = await appointment.findAll({ include: [{ model: User }] });
    res.status(200).json(appointmentData);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
    const appointmentData = await appointment.create({
      customer_id: req.body.customer_id,
      barber_id: req.body.barber_id,
      dateTime: req.body.dateTime
      });
    
    return res.json(appointmentData);
});

router.put('/:id', async (req, res) => {
    const appointmentData = await appointment.update(
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        barber: req.body.barber,
        date: req.body.date,
        time: req.body.time,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  
    return res.json(appointmentData);
  });
  
router.delete('/:id', async (req, res) => {
  const appointmentData = await appointment.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(appointmentData);
});

module.exports = router;