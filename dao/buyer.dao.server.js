const buyerModel = require('./../models/buyer.model.server');

register = () => {
    return buyerModel.create({
        offers: [],
        questions: [],
        events: []
    });
}

module.exports = {
    register
};