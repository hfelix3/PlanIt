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

// Login
router.post('/login', async (req, res) => {
  try {

    const dbUserData = await User.findOne({
        where: {
          email: req.body.email
        }      
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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