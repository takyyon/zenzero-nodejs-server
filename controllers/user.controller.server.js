module.exports = function(app) {
    const userService = require('./../services/user.service.server');

    findAllUsers = (req, res) => {
        userService.findAllUsers()
            .then((users) => res.json(users));
    };

    registerBuyer = (req, res) => {
        userService.registerBuyer(req.body)
            .then((user) => {
                req.session['user'] = user;
                req.session['type'] = 'buyer';
                res.send(req.session);
            });
    }

    registerOwner = (req, res) => {
        userService.registerOwner(req.body)
            .then((user) => {
                req.session['user'] = user;
                req.session['type'] = 'owner';
                res.send(req.session);
            });
    }

    createBuyerForUser = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        userService.createBuyerForUser(req.session['user']._id)
            .then((user) => {
                res.send(200);
            });
    }

    createOwnerForUser = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        userService.createOwnerForUser(req.session['user']._id)
            .then((user) => {
                res.send(200);
            });
    }

    loginBuyer = (req, res) => {
        if(req.session['user']) {
            res.send(400);
        }
        userService.login(req.body)
            .then((user) => {
                if(user == null || (
                    user && !user.buyer
                )) {
                    res.send(400);
                }
                req.session['user'] = user;
                req.session['type'] = 'buyer';
                res.send(req.session);
            });
    }

    loginOwner = (req, res) => {
        if(req.session['user']) {
            res.send(400);
        }
        userService.login(req.body)
            .then((user) => {
                if(user == null || (
                    user && !user.owner
                )) {
                    res.send(400);
                }
                req.session['user'] = user;
                req.session['type'] = 'owner';
                res.send(req.session);
            });
    }

    logout = (req, res) => {
        req.session.destroy();
        res.send(200);
    }

    fetchLoggedUser = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        userService.findUserById(req.session['user']._id)
            .then((user) => {
                const returnUser = {
                    type: req.session['type'],
                    id: user._id,
                    name: user.name,
                    email: user.email
                };
                res.json(returnUser);
            });
    }

    findBuyerInfo = (req, res) => {
        const id = req.params.id;
        userService.findUserById(id)
            .then((user) => {
                if(user && user.buyer) {
                    const buyer = {
                        id: user._id,
                        name: user.name,
                        offers: user.buyer.offers,
                        questions: user.buyer.questions,
                        events: user.buyer.events
                    };
                    res.json(buyer);
                }
                res.send(400);
            });
    }

    findOwnerInfo = (req, res) => {
        const id = req.params.id;
        userService.findUserById(id)
            .then((user) => {
                if(user && user.owner) {
                    const owner = {
                        id: user._id,
                        name: user.name,
                        restaurants: user.owner.restaurants,
                        comments: user.owner.comments
                    };
                    res.json(owner);
                }
                res.send(400);
            });
    }

    switchUser = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        userService.findUserById(req.session['user']._id)
            .then((user) => {
                if(req.session['type'] == 'buyer' && user.owner) {
                    req.session['type'] = 'owner';
                    res.send(200);
                }
                if(req.session['type'] == 'owner' && user.buyer) {
                    req.session['type'] = 'buyer';
                    res.send(200);
                }
                res.send(400);
            });
    }

    updateUser = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        userService.updateUser(req.session['user']._id, req.body)
            .then((user) => {
                res.send(200);
            });
    }


    app.get('/api/users/logout/', logout);
    app.get('/api/users/', findAllUsers);
    app.put('/api/users/update', updateUser);
    app.get('/api/users/', findAllUsers);
    app.get('/api/users/switch', switchUser);
    app.get('/api/users/:id/buyer/', findBuyerInfo);
    app.get('/api/users/:id/owner/', findOwnerInfo);
    app.get('/api/users/session/', fetchLoggedUser);
    app.post('/api/users/buyer/login/', loginBuyer);
    app.post('/api/users/owner/login/', loginOwner);
    app.get('/api/users/buyer/register/', createBuyerForUser);
    app.get('/api/users/owner/register/', createOwnerForUser);
    app.post('/api/users/register/buyer/', registerBuyer);
    app.post('/api/users/register/owner/', registerOwner);
}