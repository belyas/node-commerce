import express from 'express';
import { productController } from '../../controllers/api';

const router = express.Router();

router.get('/', productController.all);
router.get('/:category_id', productController.getProductsByCategoryId);

export default router;
