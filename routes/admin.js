const express = require('express');

const authController = require('../controllers/admin');
const authGuard = require('../middlewares/auth-guard');

const router = express.Router();

router.get('/products', authGuard.loginRequired, authController.getProducts);
router.get('/add-product', authGuard.loginRequired, authController.getAddProduct);
router.post('/add-product', authGuard.loginRequired, authController.postAddProduct);
router.get('/edit-product/:id', authGuard.loginRequired, authController.getEditProduct);
router.post('/edit-product', authGuard.loginRequired, authController.postEditProduct);
router.post('/delete-product', authGuard.loginRequired, authController.postDeleteProduct);

module.exports = router;