const mongoose = require('mongoose');
const { DEFAULT_STRING_SCHEMA, DEFAULT_STRING_SCHEMA_require } = require('./helpers/mongooseValidation');

const Address = new mongoose.Schema({
    state: DEFAULT_STRING_SCHEMA,
    country: DEFAULT_STRING_SCHEMA_require,
    city: DEFAULT_STRING_SCHEMA_require,
    street: DEFAULT_STRING_SCHEMA_require,
    houseNumber: {
        type: Number,
        require: true,
        trim: true,
        minLength: 1
    },
    zip: {
        type: Number,
        trim: true,
        minLength: 4,
        default: 0,

    }
});

module.exports = Address;