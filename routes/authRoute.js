const express = require('express');
const router = express.Router();

const crypto = require('crypto');
const { check, validationResult } = require('express-validator');

const authController = require('../controller/auth');

// Login
router.post('/login', authController.login);

// Validate Token
router.post('/validate',[
  check('token')
    .notEmpty()
    .withMessage('token should not be null')
], authController.validateToken)

// logout
router.post('/logout', authController.logout);

module.exports = router;