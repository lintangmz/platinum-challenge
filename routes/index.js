const express = require('express')
const router = express.Router()

const userController = require('../controllers').user;
const itemController = require('../controllers').item;
const orderController = require('../controllers').order;

/* Register and Login */
router.post('/api/register', userController.add);
router.get('/api/login', userController.logIn);

/* User Router */
router.get('/api/users', userController.list);
router.get('/api/user/:id', userController.getById);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);

/* Item Router */
router.get('/api/items', itemController.list);
router.get('/api/item/:id', itemController.getById);
router.post('/api/item', itemController.add);
router.put('/api/item/:id', itemController.update);
router.delete('/api/item/:id', itemController.delete);

/* Order Router */
router.get('/api/orders', orderController.list);
router.get('/api/order/:id', orderController.getById);
router.post('/api/order', orderController.add);
router.put('/api/order/:id', orderController.update);
router.delete('/api/order/:id', orderController.delete);

module.exports = router;