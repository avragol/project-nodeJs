const filterCardToClientMongo = require('../../models/mongoDB/cards/helpers/filterCardToClientMongo.js')
const config = require('config');

const dbOption = config.get("dbOption")

const filterCardToClientService = (card) => {
    switch (dbOption) {
        case "mongo":
        default:
            return filterCardToClientMongo(card);
    }

};

module.exports = filterCardToClientService;