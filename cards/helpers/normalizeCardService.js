const normalizationCardMongo = require("../../models/mongoDB/cards/helpers/normalizeCard");
const config = require('config');

const dbOption = config.get("dbOption");

const normalizeCardService = (card, userId) => {
    switch (dbOption) {
        case "mongo":
        default:
            return normalizationCardMongo(card, userId);
    }
};

module.exports = normalizeCardService;