const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const cardAccessDataService = require('../models/cardAccessData');
const normalizeCard = require('../helpers/normalizeCardService');
const cardValidationService = require('../../validation/cardsValidationService');
const authMiddleware = require('../../middlewares/authMiddleware');

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await cardAccessDataService.getAllCards();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/my-cards', authMiddleware, async (req, res) => {
    try {
        const dataFromDB = await cardAccessDataService.getCardByUserId(req.userData._id);
        res.json(dataFromDB);
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
router.post('/', authMiddleware, async (req, res) => {
    try {
        let normalCard = await normalizeCard(req.body, "646ca1f41e5021b5829730b6");
        await cardValidationService.createCardValidation(normalCard);
        let dataFromDBs = await cardAccessDataService.createCard(normalCard);
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});
router.put('/:id', authMiddleware, async (req, res) => {
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
router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const cardId = req.params.id;
        const userId = req.userData._id;
        await cardValidationService.cardIdValidation(cardId);
        const { likes } = await cardAccessDataService.getCardById(cardId);
        if (likes) {
            if (likes.includes(userId)) {
                await cardAccessDataService.unLikeCard(userId, cardId)
                res.json({ msg: "like removed!" });
            } else {
                await cardAccessDataService.likeCard(userId, cardId)
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

router.delete('/:id', authMiddleware, async (req, res) => {
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