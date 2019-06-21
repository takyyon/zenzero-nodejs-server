const restaurantDao = require('./../dao/restaurant.dao.server');
const offerDao = require('./../dao/offer.dao.server');

findAllRestaurants = () => {
    return restaurantDao.findAllRestaurants();
}

saveRestaurants = (restaurants) => {
    return restaurantDao.createRestaurantInBatch(restaurants);
};

findRestaurantById = (id) => {
    return restaurantDao.findRestaurantById(id);
}

deleteAllRestaurants = () => {
    return restaurantDao.deleteAllRestaurants();
}

createRestaurant = (restaurant) => {
    return restaurantDao.createRestaurant(restaurant);
}

findRestaurantByYelpId = (id) => {
    return restaurantDao.findRestaurantByYelpId(id);
}

registerToRestaurant = (restaurantId, userId) => {
    return restaurantDao.registerToRestaurant(restaurantId, userId);
}

module.exports = {
    saveRestaurants,
    findAllRestaurants,
    findRestaurantById,
    deleteAllRestaurants,
    createRestaurant,
    findRestaurantByYelpId,
    registerToRestaurant
};