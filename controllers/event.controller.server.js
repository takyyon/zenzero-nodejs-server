module.exports = function(app) {
    const eventService = require('./../services/event.service.server');
   

    deleteEventById = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }

        eventService.deleteEvent(req.params.id)
            .then(() => {
                res.json(200);
            });
    }

    getEventById = (req, res) => {
        eventService.getEventsById(req.params.id)
            .then((event) => {
                res.json(event);
            });
    }

    updateEvent = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }

        eventService.updateEvent(req.params.id, req.body)
            .then((event) => {
                res.json(event);
            });
    }

    app.delete('/api/events/:id', deleteEventById);

    app.get('/api/events/:id', getEventById);

    app.put('/api/events/:id/', updateEvent);

};