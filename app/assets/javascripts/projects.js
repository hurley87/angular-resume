

  var app = angular.module('angularResume', []);

  //all users who sign up for the site 
  app.controller('UsersController', ['$http', function($http) {
    var app = this;
    app.users = [];
    $http.get('/users.json').success(function(data){
        app.users = data;
    });
  }]);

  //all projects I've created on the site
  app.controller('ProjectsController', ['$http','$scope', function($http, $scope) {
    var app = this;
    app.projects = [];
    $http.get('/projects.json').success( function(data){
      app.projects = data;

      for (var i=0; i < app.projects.length; i++) {
        var project = app.projects[i];
        var date1 = new Date(project.start_date);
        var date2 = new Date(project.end_date);
        var timeDiff = date2.getTime() - date1.getTime();
        project.daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (project.daysLeft <= 0 ) {
          project.finished = true;
          project.projectType = 'finished';
        } else if (project.angular) {
          project.projectType = 'angular';
        } else {
          project.projectType = 'other';
        }
      }
      
    });

    // set up categories based on project type
    $scope.projectType = 'angular';

    $scope.show = function(option) {
      switch(option) {
        case 'all':
          $scope.projectType = 'other';
          break;
        case 'finished':
          $scope.projectType = 'finished';
          break;
        case 'angular':
          $scope.projectType = 'angular';
          break;
        default: 
          $scope.projectType = '';     
      }
    } 
  }]);

  //call data on specifc project I've created on the site
  app.controller('ProjectController', ['$http', function($http) {
    var id = $('#projecty').data('id');
    var app = this;
    app.project = [];
    $http.get('/projects/'+id+'.json').success( function(data){
      app.project = data;
    });
  }]);

  //counter that counts up by 1 per second
  app.controller('SkillsController', ['$scope', function($scope) {
    $scope.clock = 10;

    var updateClock = function() {
      $scope.clock += 1;
    };
    setInterval(function() {
      $scope.$apply(updateClock);
    }, 1000);
    updateClock();

    $scope.hits = 0;

    $scope.addHit = function() {
      $scope.hits = $scope.hits + 1;
      return false;
    };

  }]);

  app.directive('focus',
    function($timeout) {
      return {
        scope : {
         trigger : '@focus'
         },
        link : function(scope, element) {
          scope.$watch('trigger', function(value) {
            if (value === "true") {
              $timeout(function() { 
                element[0].focus();
              });
            }
          });
        }
      };
    }
  ); 

  app.directive('calculator', function() {
    return {
      restrict: 'E',
      templateUrl: '/projects/calculator.html',
      controller: function Calc($scope) {

        $scope.initialize = function() {
          $scope.output = 0;
              $scope.newNumber = true;
              $scope.pendingOperation = null;
              $scope.RunningTotal = null;
              $scope.pendingValue = null;
              $scope.lastOperation = null;
        }
          $scope.initialize();

          $scope.updateOutput = function(value) {
             if($scope.output == 0 || $scope.newNumber ) {
                $scope.output = value;
                $scope.newNumber = false;
             } else {
                $scope.output += String(value);
             }
             $scope.pendingValue = $scope.output*1;
          }

          $scope.add = function () {
              $scope.performOperation();
              $scope.pendingOperation = '+';
              
          }

          $scope.subtract = function () {
            $scope.performOperation();
            $scope.pendingOperation = '-';
            
          }

          $scope.multiply = function() {
            $scope.performOperation();
            $scope.pendingOperation = '*';
          }

          $scope.calculate = function() {
              $scope.performOperation();  
          }

          $scope.devide = function() {
            $scope.performOperation();
            $scope.pendingOperation = '/';
          
          }

          $scope.clear = function() {
             $scope.initialize();
          }

          $scope.performOperation = function() {

            if($scope.pendingValue) {
              switch($scope.pendingOperation) {
                case '+':
                    $scope.runningTotal += $scope.pendingValue;
                    break;
                case '-': 
                    $scope.runningTotal -= $scope.pendingValue;
                    break; 
                case '*':
                    $scope.runningTotal *= $scope.pendingValue;
                    break;  
                case '/':
                    $scope.runningTotal /= $scope.pendingValue;
                    break;     
                default:
                    $scope.runningTotal = $scope.pendingValue;    
                
              }
            } 

            $scope.output = String($scope.runningTotal);
            $scope.newNumber = true;
            $scope.pendingValue = null;
       
          }

      }
    };
  });

    
  //i used some jquery just for effect - need to figure out a way to do this in angular
  $(document).ready(function() {
      // hide skill circle when user clicks them
      $('.circle').on('click', function() {
        $(this).hide();
      });

      //animate cirlce side to side to its tough for the user to click on them
      setInterval(function() {
        $('.circle').animate({
          top: Math.random()*100,
          left: Math.random()*300
        }, 500);
      }, 500);
      
  });


