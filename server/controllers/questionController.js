var Q = require('q');
var Question = require('../models/questionModel.js');

// Promisify a few mongoose methods with the `q` promise library
var createQuestion = Q.nbind(Question.create, Question);
var findAllQuestions = Q.nbind(Question.find, Question);

module.exports = {
  allQuestions: function (req, res, next) {
    findAllQuestions({})
      .then(function (questions) {
        res.json(questions);
      })
      .fail(function (error) {
        next(error);
      });
  },
  newQuestion: function (req, res, next) {
    var newQuestion = {
      text: req.body.text,
      answer: req.body.answer, 
      categoryId: req.body.categoryId, 
      tag: req.body.tag, 
      difficulty: req.body.difficulty
    };

    createQuestion(newQuestion)
      .then(function (createdQuestion) {
        if (createdQuestion) {
          res.json(createdQuestion);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};
