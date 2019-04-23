const express = require('express');

const router = express.Router();
const categoryController = require('../../controllers/category');

router.get('/', categoryController.index);

module.exports = router;