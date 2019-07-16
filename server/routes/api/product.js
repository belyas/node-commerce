import express from 'express';
import { productController } from '../../controllers/api';

const router = express.Router();

router.get('/', productController.all);
router.get('/category/:categoryId', productController.getProductsByCategoryId);
router.get('/:productId/product', productController.getProductId);

export default router;
