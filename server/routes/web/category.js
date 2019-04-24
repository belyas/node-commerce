import express from 'express';

import { CategoryController } from '../../controllers';

const router = express.Router();

router.get('/', CategoryController.index);

export default router;
