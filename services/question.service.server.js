const questionDao = require('./../dao/question.dao.server');

createQuestion = (question, userId) => {
    return questionDao.createOffer(question, userId);
}

module.exports = {
    createQuestion
};