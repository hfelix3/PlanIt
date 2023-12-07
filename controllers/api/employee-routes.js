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

router.get('/:id', async (req, res) => {
    try {
        const employeeData = await employee.findByPk(req.params.id);
        if (!employeeData) {
            res.status(404).json({ message: 'No employee found with that id!' });
            return;
        }
        res.status(200).json(employeeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;