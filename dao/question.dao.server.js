const questionModel = require('./../models/question.model.server');

createQuestion = (question, restaurantId, userId) => {
    return questionModel.create({
        text: question.text,
        user: userId,
        restaurant: restaurantId
    });
}

getQuestionsByRestaurantId = (restaurantId) => {
    return questionModel
            .find({'restaurant': restaurantId});
}

getQuestionsByUserId = (userId) => {
    return questionModel
            .find({'user': userId});
}

getQuestionById = (id) => {
    return questionModel
            .findById(id)
            .populate('restaurant', '_id name user')
            .populate('user', '_id name');
}

getAllQuestions = () => {
    return questionModel
            .find();
}

module.exports = {
    createQuestion,
    getQuestionsByRestaurantId,
    getQuestionsByUserId,
    getAllQuestions,
    getQuestionById
};