const constants = require('../utility/constants')();
const userDao = require('./../dao/user.dao.server');

findAllUsers = () => {
    return userDao.findAllUsers();
}

registerOwner = () => {

}

module.exports = {
    findAllUsers,
    registerOwner
};