'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', 'githubHistoryService', function($scope, githubHistoryService) {

  $scope.gitData = "";

  var init = function() {
    githubHistoryService.getGithubData().success(function(commits) {
      $scope.gitData = commits;
    });
    console.log("scope data is " + $scope.gitData);
  };
  init();
}]);
