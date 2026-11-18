const express = require('express');
const router = express.Router();
const pilotController = require('../controllers/pilotController');

router.get('/', pilotController.getPilots);
router.get('/:id', pilotController.getPilotById);
router.post('/', pilotController.createPilot);
router.put('/:id', pilotController.updatePilot);
router.delete('/:id', pilotController.deletePilot);

module.exports = router;
