const router = require('express').Router();
const employee = require('../../models/employee');

router.get('/', async (req, res) => {
    try {
        const employeeData = await employee.findAll();
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;