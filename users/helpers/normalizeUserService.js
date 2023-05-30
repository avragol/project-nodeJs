const normalizationUserMongo = require("../../models/mongoDB/users/helpers/normalizeUser");
const dbOption = "mongo";

const normalizationUserService = (userData) => {
    switch (dbOption) {
        case "mongo":
        default:
            return normalizationUserMongo(userData);
    }
};

module.exports = normalizationUserService;