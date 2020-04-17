const express = require('express');

const authController = require('../controllers/main');

const router = express.Router();

router.get('/', authController.getIndex);

module.exports = router;