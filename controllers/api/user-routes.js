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

// Create user
router.post('/', async (req, res) => {
    try {
      
      const dbUserData = await User.findOne({
        where: {
          name: req.body.name,
        }
      });

      if (dbUserData) {
        res.status(400).json({ message: 'Username already exists' });
        return;
      };

      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.name = req.body.name;
        req.session.userId = userData.id;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
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
      req.session.name = req.body.name;
      req.session.userId = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
  
// Create logout route
router.post('/logout', (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If there is no session, then the logout request will send back a no resource found status
    res.status(404).end();
  }
});

  module.exports = router;