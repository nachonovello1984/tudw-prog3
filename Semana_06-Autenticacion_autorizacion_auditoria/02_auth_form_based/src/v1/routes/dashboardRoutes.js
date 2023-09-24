const express = require('express');
const dashboardController = require('./../../controllers/dashboardController.js');
const { isAuthenticated } = require('../../middlewares/isAuthenticated.js');

const router = express.Router();

router.get('/dashboard', isAuthenticated, dashboardController.index);

module.exports = router;