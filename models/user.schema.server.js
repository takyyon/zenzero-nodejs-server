const mongoose = require('mongoose');
const ownerSchema = require('./owner.schema.server');
const buyerSchema = require('./buyer.schema.server');

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: {type: Date, default: Date.now},
    owner: Boolean,
    buyer: Boolean
}, {collection: 'user'});

module.exports = userSchema;