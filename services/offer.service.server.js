const offerDao = require('./../dao/offer.dao.server');

createOffer = (offer) => {
    return offerDao.createOffer(offer);
}

module.exports = {
    createOffer
};