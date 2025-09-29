const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

router.post('/alerts', alertController.createAlert);

router.get('/alerts/recent', alertController.getRecentAlerts);

module.exports = router;