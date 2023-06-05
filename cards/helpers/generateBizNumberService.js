const config = require('config')
const generateBizNumberMongo = require('../../models/mongoDB/cards/helpers/generateBizNumber');

const dbOption = config.get("dbOption");

const generateBizNumber = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return generateBizNumberMongo();
    }
};

module.exports = generateBizNumber;