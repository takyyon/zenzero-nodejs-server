const mongoose = require('mongoose');

const offerSchema = mongoose.Schema({
    code: String,
    text: String,
    start: String,
    end: String,
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' }],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel' },
    created: {type: Date, default: Date.now},
}, {collection: 'offer'});

module.exports = offerSchema;