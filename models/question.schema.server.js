const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');

const questionSchema = mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'RestaurantModel' }
}, {collection: 'question'});

module.exports = questionSchema;