const restaurantModel = require('./../models/restaurant.model.server');

findRestaurantById = (id) => {
    return restaurantModel
            .findById(id)
            .populate('user', '_id name');
}

findAllRestaurants = () => {
    return restaurantModel.find().populate('user', '_id name');
}

createRestaurantInBatch = (restaurants) => {
    return restaurantModel.collection.insert(restaurants);
}

createRestaurant = (restaurant) => {
    return restaurantModel.create({
        yelp: restaurant.id,
        image: restaurant.image_url,
        name: restaurant.name,
        address: restaurant.location.display_address ? restaurant.location.display_address.join(' ') : '',
        latitude: restaurant.coordinates ? restaurant.coordinates.latitude : 0,
        longitude: restaurant.coordinates ? restaurant.coordinates.longitude : 0,
        url: restaurant.url,
        price: restaurant.price,
        user: null,
        offers: [],
        questions: [],
        events: []
    });
}

findRestaurantByYelpId = (id) => {
    return restaurantModel.findOne({'yelp': id}).populate('user', '_id name');
}

deleteAllRestaurants = () => {
    return restaurantModel.remove({});
}

registerToRestaurant = (restaurantId, userId) => {
    return restaurantModel.update({'_id': restaurantId}, { 'user': userId });
}

deRegisterToRestaurant = (restaurantId, userId) => {
    return restaurantModel.update({'_id': restaurantId}, { 'user': null });
;}

findRestaurantsByUserId = (id) => {
    return restaurantModel.find({'user': id}).populate('user', '_id name');
}

module.exports = {
    findRestaurantById,
    findRestaurantByYelpId,
    findAllRestaurants,
    createRestaurant,
    createRestaurantInBatch,
    deleteAllRestaurants,
    registerToRestaurant,
    findRestaurantsByUserId,
    deRegisterToRestaurant
};