const express = require('express');
const router = express.Router();
import userController from '../controllers/userController';

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.post('/forgotpassword', userController.forgotPassword);

router.post('/resetpassword', userController.resetPassword);

export default router;