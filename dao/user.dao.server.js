const userModel = require('./../models/user.model.server');

findAllUsers = () => {
    return userModel.find({}, '_id name email buyer owner created');
};

findUserById = (id) => {
    return userModel.findById(id, '_id name email buyer owner');
};

findUserByFields = (fields) => {
    return userModel.findOne(fields, '_id name email buyer owner');
}

registerBuyer = (body) => {
    return userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        buyer: true,
        owner: false
    });
}

registerOwner = (body) => {
    return userModel.create({
        name: body.name,
        email: body.email,
        password: body.password,
        buyer: false,
        owner: true
    });
}

createBuyerForUser = (id) => {
    
    return userModel.update({_id: id}, {$set: { buyer: true }});
}

createOwnerForUser = (id) => {
    return userModel.update({_id: id}, {$set: { owner: true }});
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
