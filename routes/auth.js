const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.get('/signup', authController.getSignup);
router.get('/logout', authController.getLogout);
router.post('/login', authController.postLogin);
router.post('/signup', authController.postSignup);

module.exports = router;