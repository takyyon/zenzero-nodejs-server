const commentDao = require('./../dao/comment.dao.server');

createComment = (comment, questionId, userId) => {
    return commentDao.createComment(comment, questionId, userId);
}

getCommentsByQuestionId = (id) => {
    return commentDao.getCommentsForQuestionId(id);
}

getAllComments = () => {
    return commentDao.getAllComments();
}

module.exports = {
    createComment,
    getCommentsByQuestionId,
    getAllComments
};