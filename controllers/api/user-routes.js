// TODO: Have both GET and POST routes for retrieving and adding new data FOR user accounts.
const router = require('express').Router();
const User = require('../../models/user');
const Appointment = require('../../models/appointments');

router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll();
      res.json(userData);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.post('/', async (req, res) => {
    const userData = await user.create(req.body);
    return res.json(userData);
});

router.put('/:id', async (req, res) => {
    const userData = await user.update(
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  
    return res.json(userData);
  });
  
  router.delete('/:id', async (req, res) => {
    const userData = await user.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    return res.json(userData);
  });

  module.exports = router;