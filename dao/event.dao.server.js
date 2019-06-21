const eventModel = require('./../models/event.model.server');


createEvent = (event, restaurantId) => {
    return eventModel.create({
        title: event.title,
        text: event.text,
        start: event.start,
        end: event.end,
        restaurant: restaurantId,
        likedBy: []
    });
}

getEventsByRestaurantId = (restaurantId) => {
    return eventModel
            .find({'restaurant': restaurantId});
}

getEventsByUserId = (userId) => {
    return eventModel
            .find({'liked.$': userId});
}

getEventsById = (id) => {
    return eventModel
            .findByid(id)
            .populate('restaurant', '_id name');
}

getAllEvents = () => {
    return eventModel
            .find();
}

likeEvent = (id, userId) => {
    return eventModel.update({'_id': id}, {'$push': {'liked': userId}});
}

deleteEvent = (id) => {
    return eventModel.remove({'_id': id});
}

updateEvent = (id, newEvent) => {
    return eventModel.update({_id: id }, {$set: {
        title: newEvent.title,
        text: newEvent.text,
        start: newEvent.start,
        end: newEvent.end
    }});
}

module.exports = {
    createEvent,
    getEventsByRestaurantId,
    getEventsByUserId,
    getAllEvents,
    getEventsById,
    likeEvent,
    deleteEvent,
    updateEvent
};