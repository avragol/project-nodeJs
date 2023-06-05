const express = require('express');
const router = express.Router();
const handleError = require('../../utils/handleError');
const cardAccessDataService = require('../models/cardAccessData');
const normalizeCard = require('../helpers/normalizeCardService');
const cardValidationService = require('../../validation/cardsValidationService');
const authMiddleware = require('../../middlewares/authMiddleware');
const permissionsMiddleware = require('../../middlewares/permissionsMiddleware');
const generateBizNumber = require('../helpers/generateBizNumberService');

router.get('/', async (req, res) => {
    try {
        const dataFromDB = await cardAccessDataService.getAllCards();
        res.json(dataFromDB);
    } catch (err) {
        handleError(res, err.message, 400);
    }
});

router.get('/my-cards', authMiddleware,
    async (req, res) => {
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
router.post('/', authMiddleware, permissionsMiddleware(false, true, false),
    async (req, res) => {
        try {
            let normalCard = await normalizeCard(req.body, req.userData._id);
            await cardValidationService.createCardValidation(normalCard);
            let dataFromDB = await cardAccessDataService.createCard(normalCard);
            res.json(dataFromDB);
        } catch (err) {
            handleError(res, err.message, 400);
        }
    });

router.put('/:id', authMiddleware, permissionsMiddleware(false, false, true),
    async (req, res) => {
        try {
            const id = req.params.id;
            let normalCard = await normalizeCard(req.body, req.userData._id);
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

router.patch('/bizNum/:id', authMiddleware, permissionsMiddleware(true, false, false),
    async (req, res) => {
        try {
            const cardId = req.params.id;
            await cardValidationService.cardIdValidation(cardId);
            const cardFromDb = await cardAccessDataService.updateCard(
                cardId,
                { bizNumber: await generateBizNumber() }
            );
            res.json({ msg: `the new biz number is ${cardFromDb.bizNumber}` });
        } catch (err) {
            console.log(err);
            handleError(res, err.message, 400);
        }
    });

router.delete('/:id', authMiddleware, permissionsMiddleware(true, false, true),
    async (req, res) => {
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