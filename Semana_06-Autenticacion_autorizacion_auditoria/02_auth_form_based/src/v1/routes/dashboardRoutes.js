import express from 'express';
import DashboardController from './../../controllers/dashboardController.js';
import isAuthenticated from '../../middlewares/isAuthenticated.js';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/dashboard', isAuthenticated, dashboardController.index);

export default router;