module.exports = function(app) {
    const offerService = require('./../services/offer.service.server');
    const constants = require('../utility/constants')();
    const jwt = require('jsonwebtoken');

    deleteOfferById = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                offerService.deleteOffer(req.params.id)
                    .then(() => {
                        res.json(200);
                    });
            }
        });
    }

    getOfferById = (req, res) => {
        offerService.getOffersById(req.params.id)
            .then((offer) => {
                res.json(offer);
            });
    }

    updateOffer = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                offerService.updateOffer(req.params.id, req.body)
                    .then((offer) => {
                        res.json(offer);
                    });
            }
        });
    }

    likeOffer = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                offerService.likeOffer(req.params.id, authData.user)
                    .then((response) => {
                        res.sendStatus(200);
                    });
            }
        });
    }

    unLikeOffer = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                offerService.unLikeOffer(req.params.id, authData.user)
                    .then((response) => {
                        res.sendStatus(200);
                    });
            }
        });
    }

    getAllOffers = (req, res) => {
        offerService.getAllOffers()
            .then((offers) => {
                res.json(offers)
            });
    }

    verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if(typeof authHeader !== 'undefined') {
            const bearer = authHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else {
            res.sendStatus(403);
        }
    }

    app.get('/api/offers/:id/like/', verifyToken, likeOffer);
    app.get('/api/offers/:id/un-like/', verifyToken, unLikeOffer);

    app.delete('/api/offers/:id', verifyToken, deleteOfferById);

    app.get('/api/offers/:id', getOfferById);

    app.put('/api/offers/:id/', verifyToken, updateOffer);

    app.get('/api/offers/', getAllOffers);

};