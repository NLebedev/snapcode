angular.module('snapcode.questions', [])

.controller('QuestionsController', function ($scope, Questions) {
  // Your code here

  $scope.data = {};
  var initializeQuestions = function () {
    Questions.getAll()
      .then(function (questions) {
        $scope.data.questions = questions;
      })
      .catch(function (error) {
        console.error('Error in initializeQuestions',error);
      });
  };

  $scope.createQuestion = function () {
    Questions.addOne($scope.question)
      .then(function (resp) {
        console.log('Successfully created question, server response:', resp)
        $location.path('/add-question');
      })
      .catch(function (error) {
        console.error('Error while adding question', error);
      });
  };


  initializeQuestions();
  });
