const offerDao = require('./../dao/offer.dao.server');

createOffer = (offer, restaurantId) => {
    return offerDao.createOffer(offer, restaurantId);
}

getOffersByRestaurantId = (restaurantId) => {
    return offerDao.getOffersByRestaurantId(restaurantId);
}

getOffersByUserId = (userId) => {
    return offerDao.getOffersByUserId(userId);
}

getOffersById = (id) => {
    return offerDao.getOffersById(id);
}

getAllOffers = () => {
    return offerDao.getAllOffers();
}

likeOffer = (id, userId) => {
    return offerDao.likeOffer(id, userId);
}

deleteOffer = (id) => {
    return offerDao.deleteOffer(id);
}

updateOffer = (id, offer) => {
    return offerDao.updateOffer(id, offer);
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