const express = require('express');
const router = express.Router();
const visionController = require('../controllers/visionController');

router.get('/', visionController.getAllItems);
router.post('/', visionController.createItem);
router.put('/:id', visionController.updateItem);
router.delete('/:id', visionController.deleteItem);

module.exports = router;
