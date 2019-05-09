import express from 'express';
import { CategoryController } from '../../controllers';

const router = express.Router();

router.get('/', CategoryController.index);
router.get('/add', CategoryController.addCategory);
router.post('/add', CategoryController.postCategory);
router.get('/edit/:id', CategoryController.editCategory);
router.put('/update', CategoryController.updateCategory);

export default router;
