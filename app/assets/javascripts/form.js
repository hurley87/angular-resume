
var app = angular.module('angularResume', ['ui.bootstrap']);

 
app.controller('AppController', ['$http', function($http) {
  var app = this;
  app.users = [];
  $http.get('/users.json').success(function(data){
      app.users = data;
  });
  
}]);

app.controller('ProjectController', ['$http', function($http) {
    var app = this;
    var id = $('#project-show').data('id');

    app.project = [];
    $http.get('/projects.json').success(function(data){
        app.project = data.projects[id-1]; 
        console.log(app.project.reviews[0].body)
    }); 
 }]);