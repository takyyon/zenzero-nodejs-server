const questionDao = require('./../dao/question.dao.server');

createQuestion = (question, restaurantId, userId) => {
    return questionDao.createQuestion(question, restaurantId, userId);
}

getQuestionsByRestaurantId = (restaurantId) => {
    return questionDao.getQuestionsByRestaurantId(restaurantId);
}

getQuestionById = (id) => {
    return questionDao.getQuestionById(id);
}

getQuestionsByUserId = (userId) => {
    return questionDao.getQuestionsByUserId(userId);
}

getAllQuestions = () => {
    return questionDao.getAllQuestions();
}

module.exports = {
    createQuestion,
    getQuestionsByRestaurantId,
    getQuestionsByUserId,
    getAllQuestions,
    getQuestionById
};