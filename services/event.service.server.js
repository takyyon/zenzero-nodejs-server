const eventDao = require('./../dao/event.dao.server');

createEvent = (event) => {
    return eventDao.createOffer(event);
}

module.exports = {
    createEvent
};