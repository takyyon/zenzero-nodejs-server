const userModel = require('./../models/user.model.server');

findAllUsers = () => {
    return userModel.find();
};

module.exports = {
    findAllUsers
};
