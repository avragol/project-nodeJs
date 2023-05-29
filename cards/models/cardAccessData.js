const cardsServiceMongo = require("../../models/mongoDB/cards/cardsService");
const dbOption = "mongo";


const createCard = (cardToSave) => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.createCard(cardToSave);
    }
};

const getAllCards = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.getAllCards();
    }
};

const getCardById = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.getCardById(id);
    }
};

const getCardByUserId = (userId) => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.getCardByUserId(userId);
    }
};

const updateCard = (id, cardToUpdate) => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.updateCard(id, cardToUpdate);
    }
};

const deleteCard = (id) => {
    switch (dbOption) {
        case "mongo":
        default:
            return cardsServiceMongo.deleteCard(id);
    }
};

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    getCardByUserId,
    updateCard,
    deleteCard,
};
