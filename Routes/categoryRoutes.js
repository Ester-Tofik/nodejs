var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryController.js');

router.get('/', categoryController.list);
router.post('/', categoryController.postCategory);
router.put('/:id', categoryController.updateCategoryById);
router.delete('/:id', categoryController.deleteCategoryById);


module.exports = router;
