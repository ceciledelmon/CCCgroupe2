// Création de l'application "leCoon", ne dépendant d'aucun module []
var leCoon = angular.module('leCoon', []);

// Création du contrôleur
var createController = function ($scope, $timeout, $http, $location) {
    //Instanciation du nombre d'objets
    $scope.numberObj = 3;

    //Si le niveau choisi est 1
    if (sessionStorage.level == 1) {
        $scope.numberObj = 3;
    } else {
        //Si la variable est 2
        if (sessionStorage.level == 2) {
            $scope.numberObj = 5;
            //Si elle est 3
        } else {
            $scope.numberObj = 7;
        }
    }

    //Récupère le niveau choisi
    $scope.storeLevel = function (evt) {
        var value = evt.target.attributes.data.value.split('_');
        //Stocke temporairement le sujet (campagne, ville, maison) et le niveau (1,2,3)
        sessionStorage.topic = value[0];
        sessionStorage.level = parseInt(value[1]);
    }

    //Si le niveau et sujet sont définis
    if (sessionStorage.topic != null && sessionStorage.level != null) {
        //Récupère le tableau des objets de la Base de Données
        var promesse = $http({
            "url": 'http://lpcm.univ-lr.fr/~mlemetay/CCCPhoto/' + sessionStorage.topic + 'Json.php',
            "method": "jsonp"
        });
        promesse.then(reussite, echec);
    }

    //Création du tableau contenant les objets à deviner
    $scope.objects = [];

    //Si on reçoit bien les données
    function reussite(resultat) {
        //Récupère les clés du tableau de la BDD
        var objKeys = Object.keys(resultat.data);
        //Mélange les clés au hasard
        var ranKey = shuffle(objKeys);

        //Pour chaque objets du niveau (3,5,7)
        for (var i = 0; i < $scope.numberObj; i++) {
            //Récupère la clé i
            var number = ranKey[i];
            //Récupère les données de la clé correspondante dans le tableau de la BDD
            $scope.objects.push(resultat.data[number]);
        }
    }

    //Fonction permettant de mélanger les clés
    function shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    //En cas d'échec de récupération de données
    function echec(resultat) {
        alert('Echec lors de la récupération de données')
    }

    //Si l'utilisateur n'a pas encore fourni de pseudo
    if (localStorage.getItem("name") === null) {
        $scope.username = "";
        //Sinon on récupère le nom pour l'afficher
    } else {
        $scope.username = localStorage.name;
    }

    //Sauvegarde le pseudo de l'utilisateur
    $scope.saveName = function (name) {
        localStorage.name = name;
        $scope.username = localStorage.name;
        localStorage.level = 1;
    };

    //Nombre de secondes au timer
    var time = 120;
    $scope.counter = time;
    $scope.color = "good"; //Classe du timer
    $scope.minutes = '0' + Math.floor($scope.counter / 60); //Affichage des minutes
    $scope.secondes = '00'; //Affichage des secondes

    $scope.onTimeout = function () {
        $scope.counter--; //Décrémente le timer
        $scope.minutes = '0' + Math.floor($scope.counter / 60);
        $scope.secondes = $scope.counter % 60;

        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout, 1000);
            if ($scope.counter < time) {
                //Si il reste moins de 10 seconde rajouter un '0' avant
                if ($scope.secondes < 10) {
                    $scope.secondes = '0' + $scope.secondes;
                }
                //Si il reste entre 60 et 30s
                if ($scope.counter <= 60 && $scope.counter >= 30) {
                    $scope.color = "medium";
                } else {
                    //Si il reste moins de 30s
                    if ($scope.counter < 30) {
                        $scope.color = "bad";
                    }
                }
            }
        } else {
            //Rediriger vers page de fail
        }
    }

    //Si on est sur la page de jeu
    if (document.getElementById('game')) {
        var mytimeout = $timeout($scope.onTimeout, 1000);
    }

    //Gestion de la caméra
    document.addEventListener("deviceready", function () {
        var options = {
            quality: 50,
            allowEdit: false,
            destinationType: Camera.DestinationType.FILE_URI,
            targetWidth: 400,
            targetHeight: 300
        };

        $scope.takePicture = function (index) {
            navigator.camera.getPicture(function(imageURI){
                var image = document.getElementById('preview');
                image.setAttribute('data', index);
                //Intégre le src dans la balise img
                image.src = imageURI;
            }, cameraError, options);
        }
    }, false);

    //Si il y a une erreur lors de la prise de photo
    function cameraError(message) {
        document.getElementById('preview').insertAdjacentHTML('beforebegin', '<p>Erreur : ' + message + '</p>');
    }

    //Supprimer l'image
    $scope.deleteImg = function (evt) {
        var image = evt.currentTarget.previousElementSibling;
        image.src = "";
    }

    //Envoi l'image sur le serveur
    $scope.sendImg = function (evt) {
        var image = evt.currentTarget.previousElementSibling.previousElementSibling;
        var imageSrc = image.src;
        var index = image.getAttribute('data');
        var object = $scope.objects[index];

        //Options d'envoi
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageSrc.substr(imageSrc.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        options.chunkedMode = true;

        var params = new Object();

        options.params = params;
        options.chunkedMode = false;

        //Envoi au fichier php de traitement
        var ft = new FileTransfer();
        ft.upload(imageSrc, "http://lpcm.univ-lr.fr/~mlemetay/CCCPhoto/upload.php", function(r){
            alert(r);
            var promesse = $http({
                "url": 'http://lpcm.univ-lr.fr/~mlemetay/CCCPhoto/recherche.php?callback=JSON_CALLBACK',
                "data": {"index" : index, "keyFr" : object.nomObjet, 'keyEn1' : object.tradObjet, 'keyEn2' : object.synObjet, 'name' : options.fileName},
                "method": "jsonp",
            });
        promesse.then(success, error);
        }, fail, options);
    }

    //En cas de succès
    function win(r) {
        alert(r);
    }

    //En cas d'erreur
    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
    }

    function success(result) {
        alert(result);
        //A revoir la réception des data
        /*$scope.pourcentage = result.data;
        if ($scope.pourcentage > 50) {
            $scope.objects[result.data.index].valide = 'valide';
            var image = document.getElementById('preview');
            image.src = "";
            checkAllValide();

        } else {
            $scope.objects[result.data.index].valide = 'invalide';
        }*/

    }
    
    function error(erreur){
        alert('Erreur requête JSon');
    }

   /* function checkAllValide() {
        var nbValide = 0;
        var nbElems = $scope.objects.length;
        for (var i = 0; i < $scope.objects.length; i++) {
            if ($scope.objects[i].valide == 'valide') {
                var scoreFinal = $scope.color;
            }
        }
        if (nbValide == nbElems) {
            localStorage.level = parseInt(localStorage.level) + 1;
        }
    }*/


};

// Attachement du contrôleur à l'application, 
// permet aussi de donner un nom au contrôleur
// Le contrôleur prend en paramètre le $scope, ce qui lui permet de manipuler tous les models définis dans son rayon d'action
leCoon.controller('mainController', ["$scope", "$timeout", "$http", "$location", createController]);