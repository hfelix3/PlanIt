const router = require('express').Router();
const appointmentRoutes = require('./appointments-routes');
const userRoutes = require('./user-routes');

router.use('/appointments', appointmentRoutes);
router.use('/users', userRoutes);

module.exports = router;