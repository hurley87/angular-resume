

  var app = angular.module('angularResume', ['ui.bootstrap']);

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
        var date1 = new Date(app.projects[i].start_date);
        var date2 = new Date(app.projects[i].end_date);
        var timeDiff = date2.getTime() - date1.getTime();
        app.projects[i].daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (app.projects[i].daysLeft <= 0 ) {
          app.projects[i].finished = true;
          app.projects[i].projectType = 'finished';
        } else if (app.projects[i].angular) {
          app.projects[i].projectType = 'angular';
        } else {
          app.projects[i].projectType = 'other';
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
          alert('hey');      
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


