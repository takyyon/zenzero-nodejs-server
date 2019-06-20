const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now}
}, {collection: 'comment'});

module.exports = commentSchema;