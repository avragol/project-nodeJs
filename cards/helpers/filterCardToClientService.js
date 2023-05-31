const filterCardToClientMongo = require('../../models/mongoDB/cards/helpers/filterCardToClientMongo.js')
const dbOption = "mongo"

const filterCardToClientService = (card) => {
    switch (dbOption) {
        case "mongo":
        default:
            return filterCardToClientMongo(card);
    }

};

module.exports = filterCardToClientService;