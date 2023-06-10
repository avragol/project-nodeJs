const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const client_id = "398437381593-1er1dtpflquv1jehojsg4mg4m7e3fpkj.apps.googleusercontent.com"
const client_secret = "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"
const client = new OAuth2Client(client_id, client_secret);

router.get('/google-login', (req, res) => {
    // Redirect the user to the Google Sign-In page
    const redirect_uri = 'http://localhost:8181/google/google-callback';
    const authorizeUrl = client.generateAuthUrl({
        access_type: 'offline', // Request offline access to receive a refresh token
        scope: 'email', // Request the user's email address
        redirect_uri: redirect_uri,
    });
    res.redirect(authorizeUrl);
});

router.get('/google-callback', async (req, res) => {
    const { code } = req.query;
    //console.log(code);

    try {
        // Exchange the authorization code for tokens
        const redirect_uri = 'http://localhost:8181/google/google-callback';
        const { tokens } = await client.getToken({
            code: code,
            redirect_uri: redirect_uri, // Set the redirect_uri parameter correctly
        });

        // You can access the user's ID token, access token, refresh token, etc. from `tokens`

        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: "398437381593-1er1dtpflquv1jehojsg4mg4m7e3fpkj.apps.googleusercontent.com", // Replace CLIENT_ID with your own OAuth client ID
        });
        const payload = ticket.getPayload();
        console.log(payload);

        // Here, you can access user information from `payload` such as `payload.email`

        // Perform your own logic (e.g., creating a user account, authenticating the user)
        // based on the received user information

        res.send('Successfully logged in with Google!');
    } catch (error) {
        console.error('Google authentication error:', error);
        res.status(500).send('Google authentication error');
    }
});

module.exports = router;

