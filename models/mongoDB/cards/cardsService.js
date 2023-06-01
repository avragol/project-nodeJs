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
    return Card.find({ user_id: userId });
};

const updateCard = (id, cardToUpdate) => {
    return Card.findByIdAndUpdate(id, cardToUpdate, { new: true });
};

const deleteCard = (id) => {
    return Card.findByIdAndDelete(id);
};

const likeCard = (userId, cardId) => {
    return Card.findByIdAndUpdate(cardId, { $push: { likes: userId } }, { new: true });
};

const unLikeCard = (userId, cardId) => {
    return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true });
};

module.exports = {
    createCard,
    getAllCards,
    getCardById,
    getCardByUserId,
    updateCard,
    deleteCard,
    likeCard,
    unLikeCard,
}