const constants = require('./../utility/constants')();
const mongoose = require("mongoose");
mongoose.connect(constants.mongodbString);