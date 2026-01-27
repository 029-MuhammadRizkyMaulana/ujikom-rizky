const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');
const authController = require('../controllers/authControllers');
const checkAuth = require('../middleware/auth');

router.post('/login', authController.login);

// Rute User
router.get('/user/products', productController.getAllProducts);
router.post('/user/checkout', productController.checkout);

// Rute Admin
router.get('/admin/products', productController.getAllProducts);
router.post('/admin/products', productController.createProduct);
router.put('/admin/products/:id', productController.updateProduct);
router.delete('/admin/products/:id', productController.deleteProduct);

module.exports = router;