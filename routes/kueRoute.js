const express = require('express');
const router = express.Router();

const kueController = require('../controller/similarity');

// Login
router.get('/liatkue', kueController.liatKue);
router.get('/belikue', kueController.beliKue);
router.get('/updatekue', kueController.updateKue);

module.exports = router;