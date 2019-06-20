const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');

const questionSchema = mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now},
    comments: [commentSchema]
}, {collection: 'question'});

module.exports = questionSchema;