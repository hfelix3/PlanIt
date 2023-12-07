const router = require('express').Router();
const appointmentRoutes = require('./appointments-routes');
const userRoutes = require('./user-routes');
const employeeRoutes = require('./employee-routes');

router.use('/appointments', appointmentRoutes);
router.use('/users', userRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;