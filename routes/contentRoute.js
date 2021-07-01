const express = require('express');
const router = express.Router();

const contentController = require('../controller/contentmanager');

// Create
router.post('/create', contentController.createContent);
router.put('/:id', contentController.updateContent);
router.put('/click/:id', contentController.updateClick);
router.get('/view', contentController.getContent);
router.delete('/:id', contentController.deleteContent);

module.exports = router;