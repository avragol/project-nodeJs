const mongoose = require('mongoose');
const { URL, DEFAULT_STRING_SCHEMA_require } = require('./helpers/mongooseValidation');

const Image = new mongoose.Schema({
    url: URL,
    alt: DEFAULT_STRING_SCHEMA_require
});

module.exports = Image;