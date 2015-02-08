(function() {
    
  var app = angular.module('benzingaApp',['ngAnimate','ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/',
      	{
      	  controller: 'MainController',
      	  templateUrl: 'ticker.html'
      	})
      .when('/portfolio/',
      	{
      	  controller: 'MainController',
      	  templateUrl: 'portfolio.html'
      	})
      .when('/history/',
      	{
      	  controller: 'MainController',
      	  templateUrl: 'history.html'
      	})
      .when('/search/',
      	{
      	  controller: 'MainController',
      	  templateUrl: 'search.html'
      	})
      .when('/ticker/',
        {
          controller: 'MainController',
          templateUrl: 'ticker.html'
        })
  });

}());
