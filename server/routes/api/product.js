import express from 'express';
import { productController } from '../../controllers/api';

const router = express.Router();

router.get('/', productController.all);

export default router;
