module.exports = function(app) {
    
    const questionService = require('./../services/question.service.server');
    const commentService = require('./../services/comment.service.server');
    
    createComment = (req, res) => {
        if(!req.session['user']) {
            res.send(400);
        }
        const questionId = req.params.id;
        commentService.createComment(req.body, questionId, req.session['user']._id)
            .then((comment) => {
                res.send(200);
            });
    }

    getCommentsByQuestionId = (id) => {
        const questionId = req.params.id;
        commentService.getCommentsByQuestionId(questionId)
            .then((comment) => {
                res.send(200);
            });
    }

    getQuestionById = (id) => {
        const questionId = req.params.id;
        questionService.getQuestionById(id)
            .then((question) => {
                res.json(question);
            });
    }

    app.post('/api/questions/:id/comments', createComment);

    app.get('/api/questions/:id/comments', getCommentsByQuestionId);

    app.get('/api/questions/:id', getQuestionById);

    
};