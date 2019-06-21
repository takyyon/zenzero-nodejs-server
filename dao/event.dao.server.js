const eventModel = require('./../models/event.model.server');


createEvent = (event) => {
    return eventModel.create({
        title: event.title,
        text: event.text,
        start: event.start,
        end: event.end,
        likedBy: []
    });
}

module.exports = {
    createEvent 
};