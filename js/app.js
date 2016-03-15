// Création de l'application "leCoon", ne dépendant d'aucun module []
var leCoon = angular.module('leCoon',[]) ;

// Création du contrôleur
var createController = function($scope)
{
    if (localStorage.getItem("name") === null) {
        $scope.username = "";
    }else{
        $scope.username = localStorage.name;
    }
    	
	$scope.saveName = function(name)
	{
		localStorage.name = name;
        $scope.username = localStorage.name;
	};
    
    if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
        console.log('ok');
    } else {
    // Sorry! No Web Storage support..
        console.log('nope');
    }
};
  
// Attachement du contrôleur à l'application, 
// permet aussi de donner un nom au contrôleur
// Le contrôleur prend en paramètre le $scope, ce qui lui permet de manipuler tous les models définis dans son rayon d'action
leCoon.controller('mainController', ["$scope",  createController]) ;