
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
  $http.get('/projects.json').success(function(data){
      app.projects = data;
  });
}]);

// app.controller('ProjectController', ['$http', function($http) {
//     var app = this;
//     var id = $('#project-show').data('id');

//     app.project = [];
//     $http.get('/projects.json').success(function(data){
//         app.project = data.projects[id-1]; 
//     }); 
//  }]);