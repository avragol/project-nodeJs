const express = require('express');
const router = express.Router();
const cardRestController = require('../cards/routes/cardRestController');
const userRestController = require('../users/routes/userRestController');
const handleError = require('../utils/handleError');

router.use('/cards', cardRestController);
router.use('/users', userRestController);

router.use((req, res) => handleError(res, 'page not found', 404));

module.exports = router;