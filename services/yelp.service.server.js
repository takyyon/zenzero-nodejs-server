const constants = require('../utility/constants')();
module.exports = (app, yelp) => {
    const yelpClient = yelp.client(constants.yelpApiKey);
    const yelpDao = require('../dao/yelp.dao.server')(yelpClient);

    findAllRestaurants = (req, res) => {
        var location = req.query.location;
        if(location == undefined || location == null){
            // set default location
            location = 'boston, ma';
        }
        const promise = yelpDao.findAllRestaurants(location);
        promise.then(apiResponse => {
            res.json({data: apiResponse.jsonBody.businesses, error: 200, message: null});
        }).catch(e => {
            res.json({data: null, error: 400, message: e});
        });
    }

    findAllRestaurantsByTerm = (req, res) => {
        var location = req.query.location;
        var term = req.params.term;
        if(location == undefined || location == null){
            // set default location
            location = 'boston, ma';
        }
        const promise = yelpDao.findAllRestaurantsByTerm(location, term);
        promise.then(apiResponse => {
            res.json({data: apiResponse.jsonBody.businesses, error: 200, message: null});
        }).catch(e => {
            res.json({data: null, error: 400, message: e});
        });
    }

    findRestaurantById = (req, res) => {
        const restaurantId = req.params.id;
        const promise = yelpDao.findRestaurantById(restaurantId);
        promise.then(apiResponse => {
            res.json({data: apiResponse.jsonBody, error: 200, message: null});
        }).catch(e => {
            res.json({data: null, error: 400, message: e});
        })
    }

    app.get('/api/restaurants', findAllRestaurants);
    app.get('/api/restaurants/term/:str', findAllRestaurants);
    app.get('/api/restaurants/:id', findRestaurantById);
};