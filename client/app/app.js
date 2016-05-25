app = angular.module('snapcode', [
  // 'ui.bootstrap',
  'angularModalService',
  'snapcode.services',
  'snapcode.questions',
  'snapcode.cources',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/cources/cources.html',
      controller: 'CourcesController',
      authenticate: true
    })
    .when('/questions', {
      templateUrl: 'app/questions/questions.html',
      controller: 'QuestionsController',
      authenticate: true
    })
    .when('/score', {
      templateUrl: 'app/questions/score.html',
      controller: 'QuestionsController',
      authenticate: true
    })
    .otherwise({
      redirectTo: '/'
    });
    
    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  // $httpProvider.interceptors.push('AttachTokens');
})
// .factory('AttachTokens', function ($window) {
//   // this is an $httpInterceptor
//   // its job is to stop all out going request
//   // then look in local storage and find the user's token
//   // then add it to the header so the server can validate the request
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.snapcode');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
.run(function ($rootScope, $location) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  // $rootScope.$on('$routeChangeStart', function (evt, next, current) {
  //   if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
  //     $location.path('/signin');
  //   }
  // });
});


app.controller('Controller', function($scope, ModalService) {
    
    
    
});

app.controller('ModalController', function($scope, close, hintService) {
 $scope.data = {};
 $scope.data.hint = hintService.get();
 // $scope.data.hint = 'hello world';
 $scope.close = function(result) {
  console.log('here');
  close(result, 500);
  // $('.modal-backdrop.in').css('opacity','0');
   // close, but give 500ms for bootstrap to animate
 };

});


