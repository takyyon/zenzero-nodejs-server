module.exports = function(app) {
    const userService = require('./../services/user.service.server');
    const offerService = require('./../services/offer.service.server');
    const eventService = require('./../services/event.service.server');
    const questionService = require('./../services/question.service.server');
    const restaurantService = require('./../services/restaurant.service.server');
    const constants = require('../utility/constants')();
    const jwt = require('jsonwebtoken');

    findAllUsers = (req, res) => {
        userService.findAllUsers()
            .then((users) => res.json(users));
    };

    registerBuyer = (req, res) => {
        userService.registerBuyer(req.body)
            .then((user) => {
                login(res, user, 'buyer');
            });
    }

    registerOwner = (req, res) => {
        userService.registerOwner(req.body)
            .then((user) => {
                login(res, user, 'owner');
            });
    }

    createBuyerForUser = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                userService.createBuyerForUser(authData.user)
                .then((response) => {
                    res.send(200);
                });
            }
        });
    }

    createOwnerForUser = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                userService.createOwnerForUser(authData.user)
                .then((response) => {
                    res.send(200);
                });
            }
        });
    }

    login = (res, user, type) => {
        jwt.sign({
            user: user._id,
            type: type
        }, constants.jsonSecret, (err, token) => {
            res.json({token})
        });
    }

    loginBuyer = (req, res) => {
        userService.login(req.body)
            .then((user) => {
                if(user && user.buyer) {
                    login(res, user, 'buyer');
                }else {
                    res.sendStatus(404);
                }
            });
    }

    loginOwner = (req, res) => {
        userService.login(req.body)
            .then((user) => {
                if(user && user.owner) {
                    login(res, user, 'owner');
                }else {
                    res.sendStatus(404);
                }
            });
    }

    logout = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                /**
                 * TODO: Remove token from Client
                 */
            }
        });
    }

    fetchLoggedUser = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                userService.findUserById(authData.user)
                    .then((user) => {
                        const returnUser = {
                            type: authData.type,
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            buyer: user.buyer,
                            owner: user.owner
                        };
                        res.json(returnUser);
                    })
            }
        });
    }

    switchUser = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                jwt.sign({
                    user: authData.user,
                    type: authData.type == 'buyer' ? 'owner' : 'buyer'
                }, constants.jsonSecret, (err, token) => {
                    res.json({token});
                });
            }
        });
    }

    getEventsByUserId = (req, res) => {
        eventService.getEventsByUserId(req.params.id)
            .then((event) => {
                res.json(event);
            });
    }

    findBuyerInfo = (req, res) => {
        const id = req.params.id;
        userService.findUserById(id)
            .then((user) => {
                if(user && user.buyer) {
                    const buyer = {
                        id: user.id,
                        name: user.name,
                        type: 'buyer'
                    };
                    offerService.getOffersByUserId(user.id)
                        .then((offers) => {
                            buyer.offers = offers;
                            eventService.getEventsByUserId(user.id)
                                .then((events) => {
                                    buyer.events = events;
                                    questionService.getQuestionsByUserId(user.id)
                                        .then((questions) => {
                                            buyer.questions = questions;
                                            res.json(buyer);
                                        })         
                                });
                        });
                }else {
                    res.send(400);
                }
            });
    }

    findOwnerInfo = (req, res) => {
        const id = req.params.id;
        userService.findUserById(id)
            .then((user) => {
                if(user && user.owner) {
                    const owner = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        type: 'owner'
                    };
                    restaurantService.findRestaurantsByUserId(user.id)
                        .then((restaurants) => {
                            owner.restaurants = restaurants;
                            res.json(owner);
                        });
                }else {
                    res.send(400);
                }
            });
    }

    updateUser = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                userService.updateUser(authData.user, req.body)
                    .then((user) => {
                        login(res, user, authData.type);
                    });
            }
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

    app.get('/api/users/logout/', verifyToken, logout);
    app.get('/api/users/session/', verifyToken, fetchLoggedUser);
    app.get('/api/users/switch/', verifyToken, switchUser);
    app.put('/api/users/update/', verifyToken, updateUser);
    app.get('/api/users/buyer/register/', verifyToken, createBuyerForUser);
    app.get('/api/users/owner/register/', verifyToken, createOwnerForUser);
    
    app.get('/api/users/:id/events/', getEventsByUserId);
    app.get('/api/users/', findAllUsers);    

    app.get('/api/users/:id/buyer/', findBuyerInfo);
    app.get('/api/users/:id/owner/', findOwnerInfo);
    app.post('/api/users/buyer/login/', loginBuyer);
    app.post('/api/users/owner/login/', loginOwner);
    
    app.post('/api/users/register/buyer/', registerBuyer);
    app.post('/api/users/register/owner/', registerOwner);
}