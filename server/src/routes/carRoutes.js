const express = require('express');
const { createCar, listCars, searchCars, getCar, updateCar, deleteCar } = require('../controllers/carController');
const { isAuth } = require('../utils/auth');
const router = express.Router();

router.post('/', isAuth, createCar);
router.get('/', isAuth, listCars);
router.get('/search', isAuth, searchCars);
router.get('/:id', isAuth, getCar);
router.put('/:id', isAuth, updateCar);
router.delete('/:id', isAuth, deleteCar);

module.exports = router;
