var Questions = require('../collections/questions.js');

module.exports = {
  allQuestions: function(req, res, next) {
    Questions.reset().fetch()
    .then(function(questions) {
      res.status(200).send(questions.models);
      // res.json(questions.models);
    })
    .catch(function(err) {
      console.log('Error fetching all questions:', err);
      next(err);
    });
  },
  newQuestion: function(req, res, next) {
    console.log(req.body);
    var text = req.body.text;
    Questions.create({
      text: req.body.text,
      answer: req.body.answer,
      category: req.body.category,
      topic: req.body.topic,
      difficulty: req.body.difficulty
    })
    .then(function(newQuestion) {
      res.status(200).send(newQuestion);
    })
    .catch(function(err) {
      console.log('Error creating a question:', err);
      next(err);
    });
  }
};

