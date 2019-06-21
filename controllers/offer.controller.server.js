module.exports = function(app) {
    const offerService = require('./../services/offer.service.server');
   

    deleteOfferById = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }

        offerService.deleteEvent(req.params.id)
            .then(() => {
                res.json(200);
            });
    }

    getOfferById = (req, res) => {
        offerService.getOffersById(req.params.id)
            .then((offer) => {
                res.json(offer);
            });
    }

    updateOffer = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }

        offerService.updateOffer(req.params.id, req.body)
            .then((offer) => {
                res.json(offer);
            });
    }

    app.delete('/api/offers/:id', deleteOfferById);

    app.get('/api/offers/:id', getOfferById);

    app.put('/api/offers/:id/', updateOffer);

};