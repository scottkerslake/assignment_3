<?php

require_once('TwitterAPIExchange.php');


$settings = array(
    'oauth_access_token' => "",
    'oauth_access_token_secret' => "",
    'consumer_key' => "",
    'consumer_secret' => ""
);

// ?screen_name=sbukkit&count=40&include_rts=true
// 

// these are the fields that you change for your project
$url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$getfield = '?screen_name=OhMyCorgi&count=200&include_rts=true';
$requestMethod = 'GET';

$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
    ->buildOauth($url, $requestMethod)
    ->performRequest();


?>


