const joiCardValidation = require('./joi/cardsValidation');

const validatorOption = "joi";

const createCardValidation = (userInput) => {
    switch (validatorOption) {
        case "joi":
            return joiCardValidation.validateCardSchema(userInput);
    }
    throw new Error('validator undefind');
};

const cardIdValidation = (idToCheck) => {
    switch (validatorOption) {
        case "joi":
            return joiCardValidation.validateIdSchema(idToCheck);
    }
    throw new Error('validator undefind');
};

module.exports = {
    createCardValidation,
    cardIdValidation
}