const connectToMongo = require("./mongoDB/connectToMongo.js");
const dbOption = "mongo";

const connectToDB = () => {
    switch (dbOption) {
        case "mongo":
        default:
            return connectToMongo();
    }
};

module.exports = connectToDB;