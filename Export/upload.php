<?php
    print_r($_FILES);
    $new_image_name = $_FILES["file"]["name"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "uploads/".$new_image_name);

/*    $keyFr = $_POST['keyFr'];
    $keyEn1 = $_POST['keyEn1'];
    $keyEn2 = $_POST['keyEn2'];
    $index = $_POST['index'];

    $fileName = $_FILES["file"]["name"];
    $fileLink = "http://lpcm.univ-lr.fr/~mlemetay/CCCPhoto/uploads/".$fileName.".jpg";
    $url = "http://www.google.com/searchbyimage?image_url=$fileLink";
    $proxy = 'wwwcache.univ-lr.fr:3128';

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_PROXY, $proxy);
        curl_setopt($curl, CURLOPT_HEADER, 0);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_REFERER, 'http://lpcm.univ-lr.fr');
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11");
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        $content = utf8_decode(curl_exec($curl));
        curl_close($curl);
        //var_dump($content);
        //echo $content;
        
        $title=array();

        $dom = new DOMDocument();
        $dom->strictErrorChecking = false;  // turn off warnings and errors when parsing
        @$dom->loadHTML($content);
        $imgList = $dom->getElementsByTagName('img');
        foreach($imgList as $img){
            $newTitle = $img->getAttribute('title');
            array_push($title,$newTitle);
        }

        $valide = 0;
        $elements = 0;
        foreach($title as $elem){
            if(strpos($elem, $keyFr) || strpos($elem, $keyEn1) ||   strpos($elem, $keyEn2)){
                $valide++;
            }
    }
    $pourcentage = array('index' => $index, 'pourcent' => ($valide/$elements)*100);
    echo('angular.callbacks._0('.json_encode($pourcentage).')');
*/
?>