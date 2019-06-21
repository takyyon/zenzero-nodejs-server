const mongoose = require('mongoose');
const commentSchema = require('./comment.schema.server');

const questionSchema = mongoose.Schema({
    text: String,
    created: {type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserModel' },
    comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'CommentModel' } ]
}, {collection: 'question'});

module.exports = questionSchema;