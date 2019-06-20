import express from 'express';

import { authController } from '../../controllers/api';
import { isAuthenticatedApi } from '../../middlewares';

const router = express.Router();

router.post('/', authController.login);
router.post('/checkstatus', isAuthenticatedApi, authController.checkUserStatus);

export default router;
