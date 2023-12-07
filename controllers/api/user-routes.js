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

  router.post('/login', async (req, res) => {
    try {
      // Find the user who matches the posted e-mail address
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Verify the posted password with the password store in the database
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
      // Remove the session variables
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  module.exports = router;