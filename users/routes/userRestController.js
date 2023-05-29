const express = require('express');
const router = express.Router();


router.post('/', (req, res) => {
    console.log(`ping from register`);
    res.json({ msg: `ping from register` })
});
router.post('/login', (req, res) => {
    console.log('ping from login');
    res.json({ msg: 'ping from login' });
});


module.exports = router;