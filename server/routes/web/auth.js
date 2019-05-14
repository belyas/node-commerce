import express from 'express';

import { AuthController } from '../../controllers/web';

const router = express.Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin);
router.get('/signup', AuthController.signup);
router.post('/signup', AuthController.postSignup);
router.get('/logout', AuthController.logout);

export default router;
