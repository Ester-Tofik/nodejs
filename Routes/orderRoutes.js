var express = require('express');
var router = express.Router();
var orderController = require('../controllers/orderController.js');

router.post('/', orderController.create);
router.get('/:id',orderController.getOneOrder);
router.get('/',orderController.getallOrders);
router.delete('/:id', orderController.deleteOrderById)
router.put('/:id',orderController.updateOrderById);

module.exports = router;
