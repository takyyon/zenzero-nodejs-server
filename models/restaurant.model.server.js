const mongoose = require('mongoose');
const restaurantSchema = require('./restaurant.schema.server');

const restaurantModel = mongoose.model('RestaurantModel', restaurantSchema);

module.exports = restaurantModel;