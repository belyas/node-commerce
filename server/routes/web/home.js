import express from 'express';

import HomeController from '../../controllers/web';

const router = express.Router();

router.get('/', HomeController.index);

export default router;
