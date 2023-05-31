const filterCardToClientMongo = (card) => {
    return {

        title: card.title,
        subTitle: card.subTitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web || "",
        image: card.image,
        address: card.address
    }
};

module.exports = filterCardToClientMongo;