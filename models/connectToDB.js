const connectToMongo = require("./mongoDB/connectToMongo.js");
const config = require('config');

const dbOption = config.get("dbOption");

const connectToDB = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return connectToMongo();
    }
};

module.exports = connectToDB;