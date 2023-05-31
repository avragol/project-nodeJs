const normalizationUserMongo = require("../../models/mongoDB/users/helpers/normalizeUser");
const config = require('config');

const dbOption = config.get("dbOption");

const normalizationUserService = (userData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return normalizationUserMongo(userData);
    }
};

module.exports = normalizationUserService;