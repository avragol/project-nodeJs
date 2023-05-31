const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const userAccessData = require('../models/userAccessData');
const normalizeUser = require('../helpers/normalizeUserService');
const userValidationService = require('../../validation/userValidationService');
const hashService = require('../../utils/hash/hashService');
const tokenService = require('../../utils/token/tokenService');

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

router.post('/login', async (req, res) => {
    try {
        await userValidationService.loginUserValidation(req.body);
        let { email, password } = req.body;
        let dataFromDB = await userAccessData.getUserByEmail(email);
        if (!dataFromDB || !(await hashService.cmpHash(password, dataFromDB.password))) {
            throw new Error("Invaild email or password");
        } else {
            let token = await tokenService.generateToken({
                isAdmin: dataFromDB.isAdmin,
                isBusiness: dataFromDB.isBiz,
                _id: dataFromDB._id
            });
            res.json({ msg: "done!", token });
        }
    } catch (err) {
        handleError(res, err.message, 404)
    }
});


module.exports = router;