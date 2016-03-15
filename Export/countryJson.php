<?php 
    // Connexion à la BD 
    $maBD = new PDO('mysql:host=localhost;dbname=mlemetay', 'mlemetay','7hCzfjoK');

    // Exécution d'une requête indiquant à la BD qu'elle devra envoyer les résultats des requêtes au format UTF-8
    $maBD->exec('set names utf8') ;
   
    // Préparation de la requête
    $texteRequeteDeBase = 'SELECT * FROM objets WHERE categorie="campagne"' ;
    
    // Soumission de la requête au SGBD
    $requete = $maBD->prepare($texteRequeteDeBase) ;

    $ok = $requete->execute() ;

    // Récupération du résultat : un tableau d'objets
    $resultats = $requete->fetchAll(PDO::FETCH_OBJ)  ;

    //Encodage en json du résultat
    echo('angular.callbacks._0('.json_encode($resultats).')');
    //echo json_encode($resultats);

?>