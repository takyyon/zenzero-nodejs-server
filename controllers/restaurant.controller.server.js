module.exports = function(app) {
    const restaurantService = require('./../services/restaurant.service.server');
    const offerService = require('./../services/offer.service.server');
    const eventService = require('./../services/event.service.server');
    const questionService = require('./../services/question.service.server');
    const yelpService = require('./../services/yelp.service.server');
    const async = require('async');

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
        if(!req.session['user']) {
            res.send(400);
        }
        offerService.createOffer(req.body, req.params.id)
            .then((offer) => {
                res.send(200);
            });
    }

    createEvent = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        eventService.createEvent(req.body, req.params.id,)
            .then((event) => {
                res.send(200);
            });
    }

    createQuestion = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        questionService.createQuestion(req.body, req.params.id, req.session['user']._id)
            .then((question) => {
                res.send(200);
            });
    }

    getRestaurantById = (req, res) => {
        const restaurantId = req.params.id;
        restaurantService.getRestaurantById(restaurantId)
            .then((restaurant) => {
                yelpService.findRestaurantById(restaurant.yelp)
                    .then((yelpRestaurant) => {
                        questionService.getQuestionsByRestaurantId(restaurantId)
                            .then((questions) => {
                                yelpRestaurant.questions = questions;
                                eventService.getEventsByRestaurantId(restaurantId)
                                    .then((events) => {
                                        yelpRestaurant.events = events;
                                    });
                            });
                    });
            });
    }

    registerToRestaurant = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        restaurantService.registerToRestaurant(req.params.id, req.session['user']._id)
            .then((restaurant) => {
                res.send(200);
            });
    }

    getQuestionsByRestaurantId = (req, res) => {
        res.send(200);
    }


    app.delete('/api/restaurants/', deleteAllRestaurants);

    app.post('/api/restaurants/:id/offer', createOffer);
    app.post('/api/restaurants/:id/event', createEvent);
    app.post('/api/restaurants/:id/question', createQuestion);

    app.get('/api/restaurants/:id/question', getQuestionsByRestaurantId);

    app.get('/api/restaurants/:id', getRestaurantById);

    app.put('/api/restaurants/:id/register', registerToRestaurant);

    app.get('/api/restaurants/', findAllRestaurants);

    app.get('/api/restaurants/db/:id', findDbRestaurantById);

    app.get('/api/restaurants/db/', findAllDbRestaurants);
};