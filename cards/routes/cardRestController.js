const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const cardAccessDataService = require('../models/cardAccessData');
const normalizeCard = require('../helpers/normalizeCardService');
const cardValidationService = require('../../validation/cardsValidationService');

router.get('/', async (req, res) => {
    try {
        const dataFromMongoose = await cardAccessDataService.getAllCards();
        res.json(dataFromMongoose);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await cardValidationService.cardIdValidation(id);
        let card = await cardAccessDataService.getCardById(id);
        res.json(card);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});
router.post('/', async (req, res) => {
    try {
        let normalCard = await normalizeCard(req.body, "646ca1f41e5021b5829730b6");
        await cardValidationService.createCardValidation(normalCard);
        let dataFromMongoose = await cardAccessDataService.createCard(normalCard);
        res.json(dataFromMongoose);
    } catch (err) {
        handleError(res, err.message, 400);
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