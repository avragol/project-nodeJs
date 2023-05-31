const joiRegisterValidation = require('./joi/registerValidation');
const joiloginValidation = require('./joi/loginValidation');
const config = require('config');

const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
    if (validatorOption === 'joi') {
        return joiRegisterValidation.validateRegisterSchema(userInput);
    }
    throw new Error('validator undefind');
};

const loginUserValidation = (userInput) => {
    if (validatorOption === 'joi') {
        return joiloginValidation.validateLoginSchema(userInput);
    }
    throw new Error('validator undefind');
};

module.exports = {
    registerUserValidation,
    loginUserValidation
}