const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/:email/:password',controller.getOneUser);
router.get('/getAllUsers',controller.getAllUsers);
router.get('/:id', controller.getOneUserWithOrders);
router.put('/:id', controller.putUser);
router.post('/', controller.postUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
