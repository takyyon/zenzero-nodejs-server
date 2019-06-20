const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');
const restaurantSchema = require('./restaurant.schema.server');

const ownerSchema = mongoose.Schema({
    restaurants: [restaurantSchema],
    comments: [commentSchema]
}, {collection: 'owner'});

module.exports = ownerSchema;