const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const cardAccessDataService = require('../models/cardAccessData');
const normalizeCard = require('../helpers/normalizeCardService');
const cardValidationService = require('../../validation/cardsValidationService');
const filterCardToClientService = require('../helpers/filterCardToClientService');

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
        res.json(await filterCardToClientService(dataFromMongoose));
    } catch (err) {
        handleError(res, err.message, 400);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let normalCard = await normalizeCard(req.body, "6460db599d17caea8cecb4d0");
        await cardValidationService.cardIdValidation(id);
        await cardValidationService.createCardValidation(normalCard);
        const cardFromDB = await cardAccessDataService.updateCard(
            id,
            normalCard
        );
        res.json(cardFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const token = { _id: "6460db599d17caea8cecb4d0" }//await verifyToken(req.headers["x-auth-token"]);
        await cardValidationService.cardIdValidation(id);
        const { likes } = await cardAccessDataService.getCardById(id);
        if (likes) {
            if (likes.includes(token._id)) {
                await cardAccessDataService.unLikeCard(token._id, id)
                res.json({ msg: "like removed!" });
            } else {
                await cardAccessDataService.likeCard(token._id, id)
                res.json({ msg: "like Added!" });
            }
        } else {
            handleError(res, "could not find the card", 404);
        }
    } catch (err) {
        console.log(err);
        handleError(res, err.message, 400);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await cardValidationService.cardIdValidation(id);
        const cardFromDb = await cardAccessDataService.deleteCard(id);
        res.json({ msg: `card - ${cardFromDb.title} deleted` })
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

module.exports = router;