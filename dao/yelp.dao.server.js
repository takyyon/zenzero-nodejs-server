const constants = require('../utility/constants')();
const yelp = require('yelp-fusion');
const yelpClient = yelp.client(constants.yelpApiKey);

findAllRestaurantsByLocation = (location) => {
    return yelpClient.search({
        location: location,
        category: 'restaurants'
    });
}

findAllRestaurants = () => {
    return yelpClient.search({
        location: '',
        category: 'restaurants'
    });
}

findAllRestaurantsByTerm = (location, term) => {
    return yelpClient.search({
        term: term,
        location: location,
        category: 'restaurants'
    });
}

findRestaurantById = (restaurantId) => {
    return yelpClient.business(restaurantId);
}

module.exports = {
    findAllRestaurants,
    findAllRestaurantsByLocation,
    findAllRestaurantsByTerm,
    findRestaurantById
};
