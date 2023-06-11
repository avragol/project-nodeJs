const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const userAccessData = require('../../users/models/userAccessData');
const tokenService = require('../token/tokenService');
const normalizeUserFromGoogle = require('./normalizeUserFromGoogle');
const hashService = require('../hash/hashService');
const handleError = require('../handleError');

const router = express.Router();
const client_id = "398437381593-1er1dtpflquv1jehojsg4mg4m7e3fpkj.apps.googleusercontent.com"
const client_secret = "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"
const client = new OAuth2Client(client_id, client_secret);

router.get('/google-login', (req, res) => {
    const redirect_uri = 'http://localhost:8181/google/google-callback';
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: ['email', 'profile'],
        redirect_uri: redirect_uri,
    });
    res.redirect(authorizeUrl);
});

router.get('/google-callback', async (req, res) => {
    const { code } = req.query;

    try {

        const redirect_uri = 'http://localhost:8181/google/google-callback';
        const { tokens } = await client.getToken({
            code: code,
            redirect_uri: redirect_uri,
        });

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: "398437381593-1er1dtpflquv1jehojsg4mg4m7e3fpkj.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        let userFromDB = await userAccessData.getUserByEmail(payload.email);

        if (userFromDB) {
            let token = await tokenService.generateToken({
                isAdmin: userFromDB.isAdmin,
                isBiz: userFromDB.isBiz,
                _id: userFromDB._id
            });
            res.json({ msg: "done!", token });
        } else {
            const normalUser = normalizeUserFromGoogle(payload);
            normalUser.password = await hashService.generateHash(normalUser.password);
            const userFromDB = await userAccessData.registerUser(normalUser);
            res.json(userFromDB);
        }

    } catch (error) {
        if (error.response.data) {
            const errorsValues = Object.values(error.response.data)
            handleError(res, `Google authentication error: ${errorsValues.join(" , ")}`, 500)
        } else {
            handleError(res, `Google authentication error: ${error}`, 500)
        }
    }
});

module.exports = router;

