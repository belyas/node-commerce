import express from 'express';
import { ProductController } from '../../controllers/web';

const router = express.Router();

router.get('/', ProductController.list);
router.get('/add', ProductController.add);
router.post('/store', ProductController.store);
router.get('/edit/:id', ProductController.edit);
router.put('/update', ProductController.update);
router.delete('/delete', ProductController.delete);

export default router;
