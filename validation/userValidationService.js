const joiRegisterValidation = require('./joi/registerValidation');
const joiloginValidation = require('./joi/loginValidation');

const validatorOption = 'Joi';

const registerUserValidation = (userInput) => {
    if (validatorOption === 'Joi') {
        return joiRegisterValidation.validateRegisterSchema(userInput);
    }
    throw new Error('validator undefind');
};

const loginUserValidation = (userInput) => {
    if (validatorOption === 'Joi') {
        return joiloginValidation.validateLoginSchema(userInput);
    }
    throw new Error('validator undefind');
};

module.exports = {
    registerUserValidation,
    loginUserValidation
}