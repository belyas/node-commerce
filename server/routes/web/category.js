import express from 'express';
import { CategoryController } from '../../controllers';

const router = express.Router();

router.get('/', CategoryController.list);
router.get('/add', CategoryController.add);
router.post('/store', CategoryController.store);
router.get('/edit/:id', CategoryController.edit);
router.put('/update', CategoryController.update);

export default router;
