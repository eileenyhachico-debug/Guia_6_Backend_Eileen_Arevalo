const express = require('express');
const router = express.Router();
const airplaneController = require('../controllers/airplaneController');

router.get('/', airplaneController.getAirplanes);
router.get('/:id', airplaneController.getAirplaneById);
router.post('/', airplaneController.createAirplane);
router.put('/:id', airplaneController.updateAirplane);
router.delete('/:id', airplaneController.deleteAirplane);

module.exports = router;
