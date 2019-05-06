import express from 'express';

import { CategoryController } from '../../controllers';

const router = express.Router();

router.get('/', CategoryController.index);
router.get('/add', CategoryController.addCategory);
router.post('/add', CategoryController.postCategory);

export default router;
