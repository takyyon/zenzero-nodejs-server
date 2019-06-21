const offerModel = require('./../models/offer.model.server');

createOffer = (offer) => {
    return offerModel.create({
        code: offer.code,
        text: offer.text,
        start: offer.start,
        end: offer.end,
        likedBy: []
    });
}

module.exports = {
    
};