import express from 'express';

import { categoryController } from '../../controllers/api';

const router = express.Router();

router.get('/', categoryController.all);

export default router;
