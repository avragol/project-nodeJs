const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('ping from cards');
    res.json({ msg: 'ping from cards' });
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ping from cards with params - ${id}`);
    res.json({ msg: `ping from cards with params - ${id}` })
});
router.post('/', (req, res) => {
    console.log('ping from cards post');
    res.json({ msg: 'ping from cards post' });
});
router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ping from cards put with params - ${id}`);
    res.json({ msg: `ping from cards put with params - ${id}` })
});
router.patch('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ping from cards patch with params - ${id}`);
    res.json({ msg: `ping from cards patch with params - ${id}` })
});
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ping from cards delete with params - ${id}`);
    res.json({ msg: `ping from cards delete with params - ${id}` })
});

module.exports = router;