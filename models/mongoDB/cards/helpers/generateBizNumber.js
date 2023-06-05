const _ = require('lodash');
const Card = require('../Card');

const generateBizNumber = async () => {
    try {
        for (let i = 0; i < 1000000; i++) {
            const randomNumber = _.random(1000000, 9999999);
            const card = await Card.findOne({ bizNumber: randomNumber }, { bizNumber: 1, _id: 0 });
            if (!card) {
                return randomNumber;
            }
        }
        return null;
    } catch (err) {
        throw err;
    }
};

module.exports = generateBizNumber;
