
var app = angular.module('angularResume', ['ui.bootstrap']);

 
 app.controller('AppController', ['$http', function($http) {
    var app = this;
    app.users = [];
    $http.get('/users.json').success(function(data){
        app.users = data;
    });
    
 }]);

 app.controller('UserController', ['$http', function($http) {
    var app = this;

    this.addUser = function() {

      $http.post('/users.json').success(function(data){
          console.log(data);
         app.users.push(data);
      });
    };
    
    
 }]);