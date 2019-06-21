const restaurantModel = require('./../models/restaurant.model.server');

findRestaurantById = (id) => {
    return restaurantModel
            .findById(id)
            .populate('user', '_id name')
            .populate('offers', '_id code')
            .populate('events', '_id title')
            .populate('questions', '_id text');
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

addOfferToRestaurant = (restaurantId, offerId) => {
    return restaurantModel.update({'_id': restaurantId}, {'$push': { 'offers': offerId } });
}

addEventToRestaurant = (restaurantId, eventId) => {
    return restaurantModel.update({'_id': restaurantId}, {'$push': { 'events': eventId } });
}

addQuestionToRestaurant = (restaurantId, questionId) => {
    return restaurantModel.update({'_id': restaurantId}, {'$push': { 'questions': questionId } });
}

registerToRestaurant = (restaurantId, userId) => {
    return restaurantModel.update({'_id': restaurantId}, { 'user': userId });
;}

module.exports = {
    findRestaurantById,
    findRestaurantByYelpId,
    findAllRestaurants,
    createRestaurant,
    createRestaurantInBatch,
    deleteAllRestaurants,
    addOfferToRestaurant,
    addEventToRestaurant,
    addQuestionToRestaurant,
    registerToRestaurant
};