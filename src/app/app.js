'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'angularMoment'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
service('githubHistoryService', function($http) {
  return {
    getGithubData: function() {
      var url = "https://api.github.com/repos/bpkennedy/untitledBook/commits";
      return $http.get(url);
    }
  };
});
