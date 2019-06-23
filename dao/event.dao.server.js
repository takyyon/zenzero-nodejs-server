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
            .find({'likedBy': userId})
}

getEventsById = (id) => {
    return eventModel
            .findById(id)
            .populate('restaurant', '_id name user')
            .populate('likedBy', '_id name');
}

getAllEvents = () => {
    return eventModel
            .find()
            .populate('restaurant', '_id name')
            .populate('likedBy', '_id name');
}

likeEvent = (id, userId) => {
    return eventModel.update({'_id': id},
        {$push: { 'likedBy' : userId 
    }});
}

unLikeEvent = (id, userId) => {
    return eventModel.update({'_id': id}, {
        $pull: {'likedBy': userId}
    });
}

deleteEvent = (id) => {
    return eventModel.deleteOne({'_id': id});
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
    updateEvent,
    unLikeEvent
};