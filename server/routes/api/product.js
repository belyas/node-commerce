import express from 'express';
import { productController } from '../../controllers/api';

const router = express.Router();

router.get('/', productController.all);
router.get('/category/:category_id', productController.getProductsByCategoryId);
router.get('/:product_id/product', productController.getProductId);

export default router;
