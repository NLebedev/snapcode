angular.module('snapcode.questions', [])

.controller('QuestionsController', function ($scope, Questions, $rootScope) {
  // Your code here
  var questionsUnseen = [];
  $scope.data = {};
  var initializeQuestions = function () {
    Questions.getAll()
      .then(function (questions) {
        $scope.data.unseenQuestions = questions;
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

  $scope.showNextQuestion = function () {
    if ($scope.data.unseenQuestions.length > 0) {
      $scope.data.currentQuestion = $scope.data.unseenQuestions.splice(Math.floor(Math.random() * questionsUnseen.length), 1)[0];
      console.log('currentQuestion', $scope.data.currentQuestion);
    }
  };

  $scope.key = function($event){
    if ($event.keyCode === 39){
      //right is pressed
      $('.myCaret').css('margin-left','+=9px');
    } else if ($event.keyCode === 37) {
      //left is pressed
      $('.myCaret').css('margin-left','-=9px');
    } else if ($event.keyCode === 13) {
      //enter is pressed
      $scope.data.terminalText = '';
      $('.myCaret').css('margin-left','0');
    }
  };

  $('.terminal').click(function() {
     $('.hidden-terminal').focus();
  });
  
  initializeQuestions();

});
