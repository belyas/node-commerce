import express from 'express';

import indexController from '../../controllers/index';

const router = express.Router();

router.get('/', indexController.index);

export default router;
