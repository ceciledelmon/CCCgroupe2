// Création de l'application "leCoon", ne dépendant d'aucun module []
var leCoon = angular.module('leCoon',[]) ;

// Création du contrôleur
var createController = function($scope, $timeout)
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

    var time = 20;
    $scope.counter = time;
    $scope.color = "good";
    $scope.minutes = '0'+Math.floor($scope.counter/60);
    $scope.secondes = '00';
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
            if($scope.counter < time){
                $scope.minutes = '0'+Math.floor($scope.counter/60);
                $scope.secondes = $scope.counter%60;
                if($scope.secondes <10){
                    $scope.secondes = '0'+$scope.secondes;
                }
                if($scope.counter <= 60 && $scope.counter >= 30){
                    $scope.color = "medium";
                }else{
                    if($scope.counter < 30){
                        $scope.color = "bad";
                    }
                }
            }
        }
        else {
            //Rediriger vers page de fail
            alert("Time is up!");
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);

};
  
// Attachement du contrôleur à l'application, 
// permet aussi de donner un nom au contrôleur
// Le contrôleur prend en paramètre le $scope, ce qui lui permet de manipuler tous les models définis dans son rayon d'action
leCoon.controller('mainController', ["$scope", "$timeout",   createController]) ;