const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const cardAccessDataService = require('../models/cardAccessData');
const normalizeCard = require('../helpers/normalizeCardService');

router.get('/', (req, res) => {
    console.log('ping from cards');
    res.json({ msg: 'ping from cards' });
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ping from cards with params - ${id}`);
    res.json({ msg: `ping from cards with params - ${id}` })
});
router.post('/', async (req, res) => {
    try {
        let normalCard = await normalizeCard(req.body, "646ca1f41e5021b5829730b6");
        let dataFromMongoose = await cardAccessDataService.createCard(normalCard);
        console.log("data from mongoose", dataFromMongoose);
        res.json({ msg: 'ping from cards post(well done!)' });
    } catch (err) {
        handleError(res, err, 400);
    }
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