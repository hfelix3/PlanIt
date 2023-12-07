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

    if (!req.session.loggedIn) {
      res.status(401).json({ error: 'You must be logged in to create an appointment' });
      return;
    }

    const appointmentData = await appointment.create({
      customer_id: req.session.userId,
      barber_id: req.body.barber_id,
      dateTime: req.body.dateTime
      });
    
    
    const data = await appointment.findByPk(appointmentData.id, { include: [{ model: User }] });
    return res.json(data);
});

router.put('/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.status(401).json({ error: 'You must be logged in to update an appointment' });
    return;
  }
  console.log(req.session);

  const appointmentData = await appointment.update({
    customer_id: req.session.userId,
    barber_id: req.body.barber_id,
    dateTime: req.body.dateTime
  }, {
    where: {
      id: req.params.id,
    },
  });

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