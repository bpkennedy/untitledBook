'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
service('githubHistoryService', function($http) {

  var commitData = "";

  var getGithubData = function() {
    $http.get('https://api.github.com/repos/bpkennedy/untitledBook/commits').
      success(function (data, status, headers, config) {
        commitData = data;
        console.log(commitData);
        return commitData;
      }).
      error(function (data, status, headers, config) {
        console.log("There was some error in the http GET call to github.");
      });
  };

  return {
    getGithubData: getGithubData,
  };

});
