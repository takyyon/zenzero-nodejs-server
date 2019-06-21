const questionModel = require('./../models/question.model.server');

createQuestion = (question, userId) => {
    return questionModel.create({
        text: question.text,
        user: userId,
        comments: []
    });
}

module.exports = {
    createQuestion
};