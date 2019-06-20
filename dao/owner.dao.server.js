const ownerModel = require('./../models/owner.model.server');

register = () => {
    return ownerModel.create({
        restaurants: [],
        comments: []
    });
}

module.exports = {
    register
};