
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
    app.users = [];
    $http.get('/users.json').success(function(data){
        app.users = data;
    });
    
 }]);