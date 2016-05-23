var questionController = require('../controllers/questionController.js');
module.exports = function (app, express) {
  app.get('/', questionController.allQuestions);
  app.post('/', questionController.newQuestion);
};