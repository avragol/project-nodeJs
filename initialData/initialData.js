const { users, cards } = require('./initialData.json');
const { createCard, getAllCards } = require('../cards/models/cardAccessData');
const { registerUser, getAllUsers } = require('../users/models/userAccessData');
const { registerUserValidation } = require('../validation/userValidationService');
const { createCardValidation } = require('../validation/cardsValidationService');
const normalizeCard = require('../cards/helpers/normalizeCardService');
const normalizeUser = require('../users/helpers/normalizeUserService');
const hashService = require('../utils/hash/hashService');

const initialData = async () => {
    try {
        const cardsFromDB = await getAllCards();
        const usersFromDB = await getAllUsers();
        if (usersFromDB.length === 0) await initUsers();
        if (cardsFromDB.length === 0) await initCards(await getSomeId());
    } catch (err) {
        console.log(err);
    }
};

const getSomeId = async () => {
    const usersFromDB = await getAllUsers();
    let id = "6469e1f355ab41ab2413a852"
    for (let i = 0; i < usersFromDB.length; i++) {
        if (usersFromDB[i].isBiz === true) {
            id = usersFromDB[i]._id.toHexString();
            break;
        }
    };
    return id;
};


const initCards = async (userId) => {
    cards.forEach(async card => {
        try {
            const normalCard = await normalizeCard(card, userId)
            await createCardValidation(normalCard);
            await createCard(normalCard);
        } catch (err) {
            console.log(err);
        }
    })
};

const initUsers = async () => {
    users.forEach(async user => {
        try {
            const normalUser = await normalizeUser(user);
            await registerUserValidation(normalUser);
            normalUser.password = await hashService.generateHash(normalUser.password);
            await registerUser(normalUser);
        } catch (err) {
            console.log(err);
        }
    })
};

module.exports = initialData;