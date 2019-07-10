import express from 'express';

import { ProfileController } from '../../controllers/web';

const router = express.Router();

router.get('/', ProfileController.profile);
router.put('/', ProfileController.updateProfile);

export default router;
