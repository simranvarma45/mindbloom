const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router();
const visionController = require('../controllers/visionController');

router.get('/',protect, visionController.getAllItems);
router.post('/',protect, visionController.createItem);
router.put('/:id',protect, visionController.updateItem);
router.delete('/:id',protect, visionController.deleteItem);

module.exports = router;
