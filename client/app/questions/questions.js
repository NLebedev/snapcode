angular.module('snapcode.questions', ['angularModalService'])

.controller('QuestionsController', function ($scope, $rootScope, $location, Questions, scoreFactory, ModalService, hintService) {
  // Your code here
  
  //VARIABLES
  ////////////////////
  $caret = $('.myCaret');
  $scope.data = {};
  var numberOfQ = 5;
  var answeredCount = 0;
  var currentScore = 0;
  var scorePrize = 100;
  var priceOfSecond = 2;
  var questionsUnseen = [];
  ////////////////////

  $scope.data.totalScore = scoreFactory.get();
  
  //get all questions
  var initializeQuestions = function () {
    Questions.getAll()
      .then(function (questions) {
        $scope.data.unseenQuestions = questions;
      })
      .then(function (questions) {
        $scope.showNextQuestion();
      })
      .catch(function (error) {
        console.error('Error in initializeQuestions',error);
      });
  };

  //create a new question
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

  //show next q
  $scope.showNextQuestion = function () {
    if ($scope.data.unseenQuestions.length > 0 && answeredCount < numberOfQ) {
      answeredCount += 1;
      currentScore += scorePrize;
      console.log('current score is', currentScore);
      $scope.data.currentQuestion = $scope.data.unseenQuestions.splice(Math.floor(Math.random() * questionsUnseen.length), 1)[0];
      hintService.set($scope.data.currentQuestion.hint);
      console.log('currentQuestion', $scope.data.currentQuestion);
    } else {

      //TODO: show score
      scoreFactory.set(calculateScore());
      console.log('about to redirect, score is', $scope.data.totalScore);
      $location.path('/score');
    }
  };

  $scope.evaluateAnswer = function () {
    if ($scope.data.terminalText === $scope.data.currentQuestion.answer) {
      console.log('Right answer!');
      $scope.data.terminalText = '';
      $scope.showNextQuestion();
    } else {
      $scope.showNextQuestion();
      console.log('Try again, expected '+ $scope.data.currentQuestion.answer + ' got ' + $scope.data.terminalText);
    }
  }

  var calculateScore = function(){
    $scope.data.totalScore = currentScore / numberOfQ;
    return $scope.data.totalScore;
  }


  //JQUERY AND DOM**************************************
  $scope.key = function($event){
    if ($event.keyCode === 39){
      //right is pressed
      $caret.css('margin-left','+=9px');
    } else if ($event.keyCode === 37) {
      //left is pressed
      $caret.css('margin-left','-=9px');
    } else if ($event.keyCode === 13) {
      //enter is pressed
      $caret.css('margin-left','0');
      $scope.evaluateAnswer();
    }
  };

  $scope.startCaret = function() {
    $caret.css('animation-iteration-count', 'infinite');
  }

  $scope.stopCaret = function() {
    $caret.css('animation-iteration-count', '0');
  }

  $('.terminal').click(function() {
     $('.hidden-terminal').focus();
  });
  //**********************************************
  ModalService.showModal({
    templateUrl: "app/modal/modal.html",
    // controller: "ModalController"

  });


  $scope.show = function() {
        ModalService.showModal({
            templateUrl: 'app/modal/modal.html',
            controller: "ModalController"
        }).then(function(modal) {
         console.log('modal is ', modal);
            modal.element.modal();
            $(".in:not(.fade)").remove();
            modal.close.then(function(result) {
              console.log('closed!');
              $scope.message = "You said " + result;
            });
        });
    };


  // ModalService.showModal({
  //   templateUrl: "app/modal/modal.html",
  //   controller: "modal"

  // }).then(function(modal) {
  //   // console.log('modal', modal)
  //   //it's a bootstrap element, use 'modal' to show it
  //   // modal.element.modal();
  //   // modal.close.then(function(result) {
  //   //   console.log(result);
  //   // });
  // });

  // $dialog.dialog({}).open('modal.html');  
  // $scope.showModal = function() {
  //   $('#myModal').modal('show');
  // }
//       $('#myModal').modal({backdrop: 'static', keyboard: false}) 


  initializeQuestions();
});
