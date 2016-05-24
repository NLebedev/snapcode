angular.module('snapcode.services', [])

.factory('Questions', function ($http) {
  // Your code here
  var getAll = function () {
    return $http({
      method: 'GET',
      url: '/api/questions'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var addOne = function (questions) {
    return $http({
      method: 'POST',
      url: '/api/questions',
      data: questions
    });
  };


  return {
    getAll: getAll,
    addOne: addOne,
  }
  
})
.factory('scoreFactory', function() {
    var score = 0;
    function set(data) {
      score = data;
    }
    function get() {
      return score;
    }

    return {
      set: set,
      get: get
    }

});