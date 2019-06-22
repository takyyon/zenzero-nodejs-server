const yelpDao = require('../dao/yelp.dao.server');

findAllRestaurants = () => {
    return yelpDao.findAllRestaurants();
}

findAllRestaurantsByLocation = (location) => {
    return yelpDao.findAllRestaurantsByLocation(location);
}

findAllRestaurantsByTerm = (location, term) => {
    return yelpDao.findAllRestaurantsByTerm(location, term);
}

findRestaurantById = (id) => {
    return yelpDao.findRestaurantById(id);
}

module.exports = {
    findAllRestaurants,
    findAllRestaurantsByLocation,
    findAllRestaurantsByTerm,
    findRestaurantById
};
