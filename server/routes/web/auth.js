import express from 'express';

import { AuthController } from '../../controllers';

const router = express.Router();

router.get('/login', AuthController.login);
router.post('/login', AuthController.postLogin);

export default router;
