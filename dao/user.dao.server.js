const userModel = require('./../models/user.model.server');
const buyerDao = require('./buyer.dao.server');
const ownerDao = require('./owner.dao.server');

findAllUsers = () => {
    return userModel.find().populate('owner').populate('buyer');
};

findUserById = (id) => {
    return userModel.findById(id).populate('owner').populate('buyer');
};

findUserByFields = (fields) => {
    return userModel.findOne(fields).populate('owner').populate('buyer');
}

registerBuyer = (body) => {
    const buyer = buyerDao.register();
    return userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        buyer: buyer._id,
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
        owner: owner._id
    });
}

createBuyerForUser = (id) => {
    const buyer = buyerDao.register();
    return userModel.update({_id: id}, {$set: { buyer: buyer._id }});
}

createOwnerForUser = (id) => {
    const owner = ownerDao.register();
    return userModel.update({_id: id}, {$set: { owner: owner._id }});
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
