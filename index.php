<?php
error_reporting(0);
// date_default_timezone_set('America/Los_Angeles');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Origin: *');

new Congress();
class Congress{
    function __construct(){
    echo $this->getResultJSON();
    }
    function getResultJSON(){
    if ($_GET["param1"] == "1"){
        $url = "http://104.198.0.197:8080/legislators?all_legislators=true&per_page=all";
            $response = file_get_contents($url);
    }else if ($_GET["param1"] == "2"){
        $url = "http://104.198.0.197:8080/bills?sponsor_id=".$_GET["param2"]."&order=introduced_on&per_page=5";
            $response = file_get_contents($url);
    }else if ($_GET["param1"] == "3"){
        $url = "http://104.198.0.197:8080/committees?member_ids=".$_GET["param2"]."&per_page=5";
            $response = file_get_contents($url);
    }else if ($_GET["param1"] == "4"){
        $url = "http://104.198.0.197:8080/bills?history.active=false&order=introduced_on&per_page=50&last_version.urls.pdf__exists=true";
            $response = file_get_contents($url);
    }else if ($_GET["param1"] == "5"){
        $url = "http://104.198.0.197:8080/bills?&history.active=true&order=introduced_on&per_page=50&last_version.urls.pdf__exists=true";
            $response = file_get_contents($url);
    }else if ($_GET["param1"] == "6"){
        $url = "http://104.198.0.197:8080/committees?order=committee_id__asc&per_page=all";
            $response = file_get_contents($url);
    }else{
        $url = "http://104.198.0.197:8080/legislators?all_legislators=true&per_page=all";
            $response = file_get_contents($url);
    }
        return $response;
    }
}
?>
