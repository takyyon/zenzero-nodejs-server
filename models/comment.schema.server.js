const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    created: {type: Date, default: Date.now}
}, {collection: 'comment'});

module.exports = commentSchema;