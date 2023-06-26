const mongoose = require("mongoose");
const cofig = require("config");

const connectToMongo = () => {
    return mongoose.connect(config.get("dbConfig.url"));
};

module.exports = connectToMongo;
