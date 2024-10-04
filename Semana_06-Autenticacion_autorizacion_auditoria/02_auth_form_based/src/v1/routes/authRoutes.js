import express from 'express';
import AuthController from './../../controllers/authController.js';

const authController = new AuthController();

const router = express.Router();

router.post('/auth/login', authController.login);

export default router;