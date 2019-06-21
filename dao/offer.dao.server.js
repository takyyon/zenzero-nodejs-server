const offerModel = require('./../models/offer.model.server');

createOffer = (offer, restaurantId) => {
    return offerModel.create({
        code: offer.code,
        text: offer.text,
        start: offer.start,
        end: offer.end,
        restaurant: restaurantId,
        likedBy: []
    });
}

getOffersByRestaurantId = (restaurantId) => {
    return offerModel
            .find({'restaurant': restaurantId});
}

getOffersByUserId = (userId) => {
    return offerModel
            .find({'liked.$': userId});
}

getOffersById = (id) => {
    return offerModel
            .findByid(id)
            .populate('restaurant', '_id name');
}

getAllOffers = () => {
    return offerModel
            .find();
}

likeOffer = (id, userId) => {
    return offerModel.update({'_id': id}, {'$push': {'liked': userId}});
}

deleteOffer = (id) => {
    return offerModel.remove({'_id': id});
}

updateOffer = (id, newOffer) => {
    return offerModel.update({_id: id }, {$set: {
        code: newOffer.code,
        text: newOffer.text,
        start: newOffer.start,
        end: newOffer.end
    }});
}

module.exports = {
    createOffer,
    getOffersByRestaurantId,
    getOffersByUserId,
    getAllOffers,
    getOffersById,
    likeOffer,
    deleteOffer,
    updateOffer
};