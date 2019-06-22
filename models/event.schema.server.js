const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: String,
    text: String,
    start: String,
    end: String,
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel' },
    created: {type: Date, default: Date.now}
}, {collection: 'event'});

module.exports = eventSchema;