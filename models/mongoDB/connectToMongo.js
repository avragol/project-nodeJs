const mongoose = require("mongoose");

const connectToMongo = () => {
    return mongoose.connect("mongodb://127.0.0.1:27017/node_project");
};

module.exports = connectToMongo;