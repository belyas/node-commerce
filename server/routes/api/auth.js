import express from 'express';
import { AuthController } from '../../controllers/api';

const router = express.Router();

router.post('/', AuthController.login);

export default router;
