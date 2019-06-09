module.exports = (yelpClient) => {
    
    findAllRestaurants = (location) => {
        return yelpClient.search({
            location: location,
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
        return yelpClient.buisness(restaurantId);
    }

    return {
        findAllRestaurants,
        findRestaurantById
    };
};