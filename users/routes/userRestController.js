const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const userAccessData = require('../models/userAccessData');
const normalizeUser = require('../helpers/normalizeUserService');
const userValidationService = require('../../validation/userValidationService');
const hashService = require('../../utils/hash/hashService');

router.post('/', async (req, res) => {
    try {
        let normalUser = await normalizeUser(req.body);
        await userValidationService.registerUserValidation(normalUser);
        normalUser.password = await hashService.generateHash(normalUser.password);
        const dataFromDB = await userAccessData.registerUser(normalUser);
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 404)
    }
});
router.post('/login', (req, res) => {
    console.log('ping from login');
    res.json({ msg: 'ping from login' });
});


module.exports = router;