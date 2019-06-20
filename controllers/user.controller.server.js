module.exports = function(app) {
    const userDao = require('./../dao/user.dao.server');

    findAllUsers = (req, res) => {
        userDao.findAllUsers()
            .then((users) => res.json(users));
    };

    registerBuyer = (req, res) => {
        userDao.registerBuyer(req.body)
            .then((user) => res.json(user));
    }

    registerOwner = (req, res) => {
        userDao.registerOwner(req.body)
            .then((user) => res.json(user));
    }

    app.get('/api/users', findAllUsers);
    app.post('/api/register/buyer', registerBuyer);
    app.post('/api/register/owner', registerOwner);
}