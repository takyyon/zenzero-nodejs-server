const commentModel = require('./../models/comment.model.server');

createComment = (comment, questionId, userId) => {
    return commentModel.create({
        text: comment.text,
        user: userId,
        question: questionId
    });
}

getCommentsByQuestionId = (id) => {
    return commentModel
            .find({'question': id})
            .populate('user', '_id name')
            .populate('question', '_id text');
}

getAllComments = () => {
    return commentModel.find();
}

module.exports = {
    createComment,
    getCommentsByQuestionId,
    getAllComments
};