const userModel = require('./../models/user.model.server');
const buyerDao = require('./buyer.dao.server');
const ownerDao = require('./owner.dao.server');

findAllUsers = () => {
    return userModel.find();
};

findUserById = (id) => {
    return userModel.findById(id);
};

findUserByFields = (fields) => {
    return userModel.findOne(fields);
}

registerBuyer = (body) => {
    const buyer = buyerDao.register();
    return userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        buyer: buyer,
        owner: null
    });
}

registerOwner = (body) => {
    const owner = ownerDao.register();
    return userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        buyer: null,
        owner: owner
    });
}

createBuyerForUser = (id) => {
    const buyer = buyerDao.register();
    return userModel.update({_id: id}, {$set: { buyer: buyer }});
}

createOwnerForUser = (id) => {
    const owner = ownerDao.register();
    return userModel.update({_id: id}, {$set: { owner: owner }});
}

updateUser = (id, newUser) => {
    return userModel.update({_id: id }, {$set: {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password
    }});
}

module.exports = {
    findAllUsers,
    findUserById,
    findUserByFields,
    registerOwner,
    registerBuyer,
    createBuyerForUser,
    createOwnerForUser,
    updateUser
};
