const express = require('express');
const router = express.Router();

const kueController = require('../controller/similarity');

// Login
router.get('/liatkue', kueController.liatKue);
router.get('/belikue', kueController.beliKue);

module.exports = router;