module.exports = function(app) {
    
    const questionService = require('./../services/question.service.server');
    const commentService = require('./../services/comment.service.server');
    const constants = require('../utility/constants')();
    const jwt = require('jsonwebtoken');
    
    createComment = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                const questionId = req.params.id;
                commentService.createComment(req.body, questionId, authData.id)
                    .then((comment) => {
                        res.send(200);
                    });
            }
        });
    }

    getCommentsByQuestionId = (req, res) => {
        const questionId = req.params.id;
        commentService.getCommentsByQuestionId(questionId)
            .then((comment) => {
                res.send(200);
            });
    }

    getQuestionById = (req, res) => {
        const questionId = req.params.id;
        questionService.getQuestionById(questionId)
            .then((question) => {
                const questionObject = {
                    '_id': question._id,
                    'text': question.text,
                    'comments': [],
                    'user': question.user,
                    'restaurant': question.restaurant
                };
                
                commentService.getCommentsByQuestionId(questionId)
                    .then((comments) => {
                        questionObject.comments = comments;
                        res.json(questionObject);
                    });
            });
    }

    getAllQuestions = (req, res) => {
        questionService.getAllQuestions()
            .then((questions) => {
                res.json(questions);
            });
    }

    verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if(typeof authHeader !== 'undefined') {
            const bearer = authHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else {
            res.sendStatus(403);
        }
    }

    app.get('/api/questions/', getAllQuestions);

    app.post('/api/questions/:id/comments', verifyToken, createComment);

    app.get('/api/questions/:id/comments', getCommentsByQuestionId);

    app.get('/api/questions/:id', getQuestionById);

    
};