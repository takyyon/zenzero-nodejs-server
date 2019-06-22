module.exports = function(app) {
    const eventService = require('./../services/event.service.server');
    const constants = require('../utility/constants')();
    const jwt = require('jsonwebtoken');

    deleteEventById = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                eventService.deleteEvent(req.params.id)
                    .then(() => {
                        res.json(200);
                    });
            }
        });
    }

    getEventById = (req, res) => {
        eventService.getEventsById(req.params.id)
            .then((event) => {
                res.json(event);
            });
    }

    updateEvent = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                eventService.updateEvent(req.params.id, req.body)
                    .then((event) => {
                        res.sendStatus(200);
                    });
            }
        });
    }

    likeEvent = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                eventService.likeEvent(req.params.id, authData.user)
                    .then((response) => {
                        res.sendStatus(200);
                    });
            }
        });
    }

    unLikeEvent = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                eventService.unLikeEvent(req.params.id, authData.user)
                    .then((response) => {
                        res.sendStatus(200);
                    });
            }
        });
    }

    getAllEvents = (req, res) => {
        eventService.getAllEvents()
            .then((events) => {
                res.json(events);
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

    app.get('/api/events/:id/like/', verifyToken, likeEvent);
    app.get('/api/events/:id/un-like/', verifyToken, unLikeEvent);

    app.delete('/api/events/:id', verifyToken, deleteEventById);

    app.get('/api/events/:id', getEventById);

    app.get('/api/events/', getAllEvents);

    app.put('/api/events/:id/', verifyToken, updateEvent);

};