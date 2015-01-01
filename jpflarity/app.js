'use strict';

var myApp = angular.module('jpflarityApp',[]);
  
myApp.controller('jpflarityController', ['$scope', '$location', '$timeout', function($scope, $location, $timeout) {
    var startFadeInDelay = 500; // ms
    var fadeInTime = 2000; // ms
    $timeout(function() { $('#mainTitle').fadeIn(fadeInTime) }, startFadeInDelay);
    $timeout(function() { $('#breakFromTheReal').fadeIn(fadeInTime) }, fadeInTime);

    $scope.showHome = true;
	$scope.showAbout = false;
	$scope.showPubs = false;
	$scope.showOrgs = false;
	$scope.showContact = false;
	
	$scope.highlightButton = function(button) {
		button.css("background", "#404040");
		button.css("box-shadow", "2px -2px 0 #AAAAAA, -2px -2px 0 #AAAAAA");
		button.css("border-bottom", "2px solid #404040");
	};
	
	var clearFlags = function() {
		$scope.showHome = false;
		$scope.showAbout = false;
		$scope.showPubs = false;
		$scope.showOrgs = false;
		$scope.showContact = false;
		$('#navBar li').css("background", "#0D0103");
		$('#navBar li').css("box-shadow", "none");
		$('#navBar li').css("border-bottom", "2px solid #AAAAAA");
	}
	
	$scope.goHome = function() {
	    $location.path("home");
		clearFlags();
		$scope.showHome = true;
		$scope.highlightButton($('#homeButton'));
	};
	
	$scope.goAbout = function() {
	    $location.path("about");
		clearFlags();
		$scope.showAbout = true;
		$scope.highlightButton($('#aboutButton'));
	}
	
	$scope.goPubs = function() {
	    $location.path("pubs");
		clearFlags();
		$scope.showPubs = true;
		$scope.highlightButton($('#pubButton'));
	};
	
	$scope.goOrgs = function() {
	    $location.path("orgs");
		clearFlags();
		$scope.showOrgs = true;
		$scope.highlightButton($('#orgButton'));
	};
	
	$scope.goContact = function() {
	    $location.path("contact");
		clearFlags();
		$scope.showContact = true;
		$scope.highlightButton($('#contactButton'));
	};
	
	if ($location.path() == "/about")
	    $scope.goAbout();
	else if ($location.path() == "/pubs")
	    $scope.goPubs();
	else if ($location.path() == "/orgs")
	    $scope.goOrgs();
	else if ($location.path() == "/contact")
	    $scope.goContact();
	else
	    $scope.goHome();
	
}]);
