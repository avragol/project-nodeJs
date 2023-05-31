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
                isBiz: dataFromDB.isBiz,
                _id: dataFromDB._id
            });
            res.json({ msg: "done!", token });
        }
    } catch (err) {
        handleError(res, err.message, 404)
    }
});

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await userAccessData.getAllUsers();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        const dataFromDB = await userAccessData.getUserById(req.params.id);
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind user", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let normalUser = await normalizeUser(req.body);
        await userValidationService.userIdValidation(req.params.id);
        await userValidationService.registerUserValidation(normalUser);
        const dataFromDB = await userAccessData.updateUser(
            req.params.id,
            normalUser
        );
        if (dataFromDB) {
            res.json(dataFromDB);
        } else {
            handleError(res, "Undefind user", 404);
        }
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await userValidationService.userIdValidation(id);
        await userAccessData.updateBizUser(id);
        res.json({ msg: "done" });
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await userValidationService.userIdValidation(req.params.id);
        const dataFromDb = await userAccessData.deleteUser(req.params.id);
        res.json({ msg: `user - ${dataFromDb.name.first} ${dataFromDb.name.last} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});


module.exports = router;