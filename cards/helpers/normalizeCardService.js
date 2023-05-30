const normalizationCardMongo = require("../../models/mongoDB/cards/helpers/normalizeCard");
const dbOption = "mongo";

const normalizeCardService = (card, userId) => {
    switch (dbOption) {
        case "mongo":
        default:
            return normalizationCardMongo(card, userId);
    }
};

module.exports = normalizeCardService;