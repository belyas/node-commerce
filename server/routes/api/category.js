import express from 'express';
import { CategoryController } from '../../controllers/api';

const router = express.Router();

router.get('/', CategoryController.all);

export default router;
