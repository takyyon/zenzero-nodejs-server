const eventDao = require('./../dao/event.dao.server');

createEvent = (event, restaurantId) => {
    return eventDao.createEvent(event, restaurantId);
}

getEventsByRestaurantId = (restaurantId) => {
    return eventDao.getEventsByRestaurantId(restaurantId);
}

getEventsByUserId = (userId) => {
    return eventDao.getEventsByUserId(userId);
}

getEventsById = (id) => {
    return eventDao.getEventsById(id);
}

getAllEvents = () => {
    return eventDao.getAllEvents();
}

likeEvent = (id, userId) => {
    return eventDao.likeEvent(id, userId);
}

unLikeEvent = (id, userId) => {
    return eventDao.unLikeEvent(id, userId);
}

deleteEvent = (id) => {
    return eventDao.deleteEvent(id);
}

updateEvent = (id, newEvent) => {
    return eventDao.updateEvent(id, newEvent);
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