// TODO: Have both GET and POST routes for retrieving and adding new data FOR appointments.
const router = require('express').Router();
const appointment = require('../models/appointment-routers');

router.get('/', async (req, res) => {
    //store appointmentData in variable
    const appointmentData = await appointment.findAll();
    // returns appointmentData as JSON
    return res.json(appointmentData);
});

router.post('/', async (req, res) => {
    const appointmentData = await appointment.create(req.body);
    
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

      module.exports = router;