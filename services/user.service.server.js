const userDao = require('./../dao/user.dao.server');

findAllUsers = () => {
    return userDao.findAllUsers();
}

registerOwner = (body) => {
    return userDao.registerOwner(body);
}

findUserById = (id) => {
    return userDao.findUserById(id);
}

registerBuyer = (body) => {
    return userDao.registerBuyer(body);
}

createBuyerForUser = (id) => {
    return userDao.createBuyerForUser(id);
}

createOwnerForUser = (id) => {
    return userDao.createOwnerForUser(id);
}

login = (body) => {
    const data = {
        email: body.email,
        password: body.password
    };
    return userDao.findUserByFields(data);
}

updateUser = (id, newUser) => {
    return userDao.updateUser(id, newUser);
}


module.exports = {
    findAllUsers,
    findUserById,
    registerOwner,
    registerBuyer,
    createBuyerForUser,
    createOwnerForUser,
    login,
    updateUser
};