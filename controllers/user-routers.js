// TODO: Have both GET and POST routes for retrieving and adding new data FOR user accounts.
const router = require('express').Router();
const user = require('../models/user-routers');

router.get('/', async (req, res) => {
    //store userData in variable
    const userData = await user.findAll();
    // returns userData as JSON
    return res.json(userData);
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