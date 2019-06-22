module.exports = function(app) {
    const restaurantService = require('./../services/restaurant.service.server');
    const offerService = require('./../services/offer.service.server');
    const eventService = require('./../services/event.service.server');
    const questionService = require('./../services/question.service.server');
    const yelpService = require('./../services/yelp.service.server');
    const async = require('async');
    const constants = require('../utility/constants')();
    const jwt = require('jsonwebtoken');

    processRestaurants = (data, res) => {
        if(data.statusCode != 200){
            res.send(400);
        }
        const yelpRestaurants = JSON.parse(data.body).businesses;
        const restaurants = [];
        async.each(yelpRestaurants, function(yelpRestaurant, callback){
            restaurantService.findRestaurantByYelpId(yelpRestaurant.id)
                .then((restaurant) => {
                    if(restaurant) {
                        restaurants.push(restaurant);
                        callback();
                    }else {
                        restaurantService.createRestaurant(yelpRestaurant)
                            .then((restaurant) => {
                                restaurants.push(restaurant);
                                callback();
                            })
                    }
                })
        }, function(err) {
            res.json(restaurants);
        });
    }

    findAllRestaurants = (req, res) => {
        if( (!req.query.term || (req.query.term && req.queryterm == '')) &&
            (!req.query.location || (req.query.location && req.query.location == ''))){
                yelpService.findAllRestaurants()
                    .then((restaurants) => {
                        processRestaurants(restaurants, res);
                    });
            }

        if( (!req.query.term || (req.query.term && req.queryterm == ''))){
                yelpService.findAllRestaurantsByLocation(req.query.location)
                    .then((restaurants) => {
                        processRestaurants(restaurants, res);
                    });
            }
        
        yelpService.findAllRestaurantsByTerm(req.query.location, req.query.location)
            .then((restaurants) => {
                processRestaurants(restaurants, res);
            });
    }

    findAllDbRestaurants = (req, res) => {
        restaurantService.findAllRestaurants()
            .then((restaurants) => {
                res.json(restaurants)
            });
    }

    findDbRestaurantById = (req, res) => {
        restaurantService.findRestaurantById(req.params.id)
            .then((restaurant) => {
                res.json(restaurant)
            });
    }

    deleteAllRestaurants = (req, res) => {
        restaurantService.deleteAllRestaurants()
            .then(() => {
                res.send(200);
            });
    }

    createOffer = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                offerService.createOffer(req.body, req.params.id)
                    .then((offer) => {
                        res.send(200);
                    });
            }
        });
    }

    createEvent = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                eventService.createEvent(req.body, req.params.id)
                    .then((event) => {
                        res.send(200);
                    });
            }
        });
    }

    createQuestion = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                questionService.createQuestion(req.body, req.params.id, authData.user)
                    .then((question) => {
                        res.send(200);
                    });
            }
        });
    }

    getRestaurantById = (req, res) => {
        const restaurantId = req.params.id;
        restaurantService.findRestaurantById(restaurantId)
            .then((restaurant) => {
                yelpService.findRestaurantById(restaurant.yelp)
                    .then((yelpRestaurant) => {
                        const restaurantDetail = yelpRestaurant.jsonBody;
                        restaurantDetail.user = restaurant.user;
                        questionService.getQuestionsByRestaurantId(restaurantId)
                            .then((questions) => {
                                restaurantDetail.questions = questions;
                                eventService.getEventsByRestaurantId(restaurantId)
                                    .then((events) => {
                                        restaurantDetail.events = events;
                                        offerService.getOffersByRestaurantId(restaurantId)
                                            .then((offers) => {
                                                restaurantDetail.offers = offers;
                                                res.json(restaurantDetail);
                                            });
                                    });
                            });
                    });
            });
    }

    registerToRestaurant = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                restaurantService.registerToRestaurant(req.params.id, authData.user)
                    .then((restaurant) => {
                        res.send(200);
                    });
            }
        });
    }

    deRegisterToRestaurant = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                restaurantService.deRegisterToRestaurant(req.params.id, authData.user)
                    .then((restaurant) => {
                        res.send(200);
                    });
            }
        });
    }

    getQuestionsByRestaurantId = (req, res) => {
        res.send(200);
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


    app.delete('/api/restaurants/', deleteAllRestaurants);

    app.post('/api/restaurants/:id/de-register/', verifyToken, deRegisterToRestaurant);
    app.post('/api/restaurants/:id/register/', verifyToken, registerToRestaurant);
    app.post('/api/restaurants/:id/offers/', verifyToken, createOffer);
    app.post('/api/restaurants/:id/events/', verifyToken, createEvent);
    app.post('/api/restaurants/:id/questions/', verifyToken, createQuestion);


    app.get('/api/restaurants/:id/questions/', getQuestionsByRestaurantId);
    app.get('/api/restaurants/:id', getRestaurantById);
    app.get('/api/restaurants/', findAllRestaurants);
    app.get('/api/restaurants/db/:id', findDbRestaurantById);
    app.get('/api/restaurants/db/', findAllDbRestaurants);
};