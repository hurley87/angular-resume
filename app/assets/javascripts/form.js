

  var app = angular.module('angularResume', ['ui.bootstrap']);

  app.controller('UsersController', ['$http', function($http) {
    var app = this;
    app.users = [];
    $http.get('/users.json').success(function(data){
        app.users = data;
    });
  }]);

  app.controller('ProjectsController', ['$http', function($http) {
    var app = this;
    app.projects = [];
    $http.get('/projects.json').success( function(data){
        app.projects = data;
    });
  }]);
