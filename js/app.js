// Création de l'application "leCoon", ne dépendant d'aucun module []
var leCoon = angular.module('leCoon', ['ngCordova']);

// Création du contrôleur
var createController = function ($scope, $timeout, $http, $location, $cordovaCamera) {

    console.log(sessionStorage.topic + ' - ' + sessionStorage.level);
    $scope.numberObj = 3;
    if(sessionStorage.level == 1) {
        $scope.numberObj = 3;
    }else{
        if(sessionStorage.level == 2){
            $scope.numberObj = 5;
        }else{
            $scope.numberObj = 7;
        }
    }

    console.log($scope.numberObj);

    //Récupère le niveau choisi
    $scope.storeLevel = function (evt) {
        var value = evt.target.attributes.data.value.split('_');
        sessionStorage.topic = value[0];
        sessionStorage.level = parseInt(value[1]);
        console.log(value[0] + ' ' + parseInt(value[1]) + ' : ' + sessionStorage.topic + ' - ' + sessionStorage.level);
    }

    if (sessionStorage.topic != null && sessionStorage.level != null) {
        //Récupère le tableau des objets
        var promesse = $http({
            "url": 'http://lpcm.univ-lr.fr/~mlemetay/CCCPhoto/' + sessionStorage.topic + 'Json.php',
            "method": "jsonp"
        });
        promesse.then(reussite, echec);
    }

    $scope.objects = [];

    function reussite(resultat) {
        console.log(resultat.data);
        for (var i = 0; i < $scope.numberObj; i++) {
            var objKeys = Object.keys(resultat.data);
            console.log(objKeys);
            var ranKey = objKeys[Math.floor(Math.random() * objKeys.length)];
            console.log(ranKey);
            $scope.objects.push(resultat.data[ranKey]);
            console.log($scope.objects);
        }
    }

    function echec(resultat) {
        console.log(resultat.data);
    }

    if (localStorage.getItem("name") === null) {
        $scope.username = "";
    } else {
        $scope.username = localStorage.name;
    }

    $scope.saveName = function (name) {
        localStorage.name = name;
        $scope.username = localStorage.name;
    };

    var time = 120;
    $scope.counter = time;
    $scope.color = "good";
    $scope.minutes = '0' + Math.floor($scope.counter / 60);
    $scope.secondes = '00';
    $scope.onTimeout = function () {
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter < time) {
                $scope.minutes = '0' + Math.floor($scope.counter / 60);
                $scope.secondes = $scope.counter % 60;
                if ($scope.secondes < 10) {
                    $scope.secondes = '0' + $scope.secondes;
                }
                if ($scope.counter <= 60 && $scope.counter >= 30) {
                    $scope.color = "medium";
                } else {
                    if ($scope.counter < 30) {
                        $scope.color = "bad";
                    }
                }
            }
        } else {
            //Rediriger vers page de fail
            alert("Time is up!");
        }
    }

    if (document.getElementById('game')) {
        var mytimeout = $timeout($scope.onTimeout, 1000);
    }

    //Gestion de la caméra
    document.addEventListener("deviceready", function () {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 400,
            targetHeight: 300
        };

        $scope.takePicture = function () {
            $cordovaCamera.getPicture(options).then(cameraSuccess, cameraError);

            function cameraSuccess(imageURI) {
                var image = document.getElementById('myImage');
                image.src = "data:image/jpeg;base64," + imageData;
            }

            function cameraError(message) {
                alert('Error : ' + message);
            }
        }
    }, false);

};

// Attachement du contrôleur à l'application, 
// permet aussi de donner un nom au contrôleur
// Le contrôleur prend en paramètre le $scope, ce qui lui permet de manipuler tous les models définis dans son rayon d'action
leCoon.controller('mainController', ["$scope", "$timeout", "$http", "$location", createController]);