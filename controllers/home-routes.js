const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        res.render("home",
        req.session.loggedIn ? { loggedIn: true } : { loggedIn: false });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    // Otherwise, render the 'login' template
    res.render('login');
  });
  
module.exports = router;