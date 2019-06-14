import express from 'express';
import { authController } from '../../controllers/api';

const router = express.Router();

router.post('/', authController.login);

export default router;
