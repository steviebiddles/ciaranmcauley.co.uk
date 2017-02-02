<?php
require_once '../vendor/autoload.php';

use Kreait\Firebase\Configuration;
use Kreait\Firebase\Firebase;

$dotenv = new Dotenv\Dotenv(dirname(__DIR__));
$dotenv->load();

Raven_Autoloader::register();
$client = new Raven_Client(getenv('SENTRY_DSN'));

$error_handler = new Raven_ErrorHandler($client);
$error_handler->registerExceptionHandler();
$error_handler->registerErrorHandler();
$error_handler->registerShutdownFunction();

$fb = new \Facebook\Facebook([
    'app_id' => getenv('FACEBOOK_APP_ID'),
    'app_secret' => getenv('FACEBOOK_APP_SECRET'),
    'default_graph_version' => 'v2.8',
    'default_access_token' => getenv('FACEBOOK_ACCESS_TOKEN'),
]);

$fields = [
    'category',
    'cover',
    'description',
    'end_time',
    'id',
    'name',
    'owner',
    'place',
    'start_time',
    'timezone',
    'type',
    'ticket_uri',
];

try {
    $response = $fb->get('/djciaranmcauley/events?fields=' . implode(',', $fields) . '&limit=20&since=' . time());
} catch (\Facebook\Exceptions\FacebookResponseException $e) {
    echo "Facebook graph returned an error.";
    throw new Exception('Graph returned an error: ' . $e->getMessage());
} catch (\Facebook\Exceptions\FacebookSDKException $e) {
    echo "Facebook SDK returned an error.";
    throw new Exception('Facebook SDK returned an error: ' . $e->getMessage());
}

$config = new Configuration();
$config->setAuthConfigFile(__DIR__ . '/../google-service-account.json');

$firebase = new Firebase('https://dj-ciaran-mcauley-events.firebaseio.com/', $config);
$firebase->set(array_reverse($response->getGraphEdge()->asArray()), 'future');

echo 'Success. Facebook SDK returned events.';
