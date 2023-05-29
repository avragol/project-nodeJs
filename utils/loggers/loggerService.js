const express = require('express');
const app = express();
const morganLogger = require('./morgan');

const loggerOption = "morgan";

const loggerService = () => {
    switch (loggerOption) {
        case "morgan":
        default:
            return morganLogger;
    }
};

module.exports = loggerService;