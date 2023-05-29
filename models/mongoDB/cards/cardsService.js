const Card = require('./Card');

const createCard = async (cardToSave) => {
    let card = new Card(cardToSave);
    return card.save();
};

const getAllCards = () => {
    return Card.find();
};

const getCardById = id => {
    return Card.findById(id)
};

const getCardByUserId = userId => {
    return Card.findOne({ _userId: userId }, { _userId: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
    return Card.findByIdAndUpdate(id, cardToUpdate, { new: true });
};

const deleteCard = (id) => {
    return Card.findByIdAndDelete(id);
};

const likeCard = async (userId, cardId) => {
    let card = await Card.findById(cardId).exec();
    if (card.likes.includes(userId)) {
        card.likes = card.likes.filter((id) => id !== userId);
    } else {
        card.likes = [...card.likes, userId];
    }
    return card.save();
}

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    getCardByUserId,
    updateCard,
    deleteCard,
    likeCard,
}