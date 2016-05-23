var questionController = require('../controllers/questionController.js');
var userController = require('../controllers/userController.js');
var util = require('./utils.js')
module.exports = function (app, express) {
  app.get('/api/questions', questionController.allQuestions);
  app.post('/api/questions', questionController.newQuestion);
  
  
  app.post('/api/users/signin', userController.signin);
  app.post('/api/users/signup', userController.signup);
  // app.get('/api/users/signedin', userController.checkAuth);

  app.post('/api/signup', userController.signup)
  // app.get('/api/questions', util.checkUser, questionController.allQuestions);
  // app.post('/api/questions', util.checkUser, questionController.newQuestion);
};

