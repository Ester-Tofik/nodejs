var express = require('express');
var router = express.Router();
var productController = require('../controllers/productController.js');


router.get('/', productController.list);
router.get('/:id', productController.show);
router.post('/', productController.post)
router.delete('/:id', productController.deleteProductById)
router.put('/:id',productController.updateProductById)

module.exports = router;