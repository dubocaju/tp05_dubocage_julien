<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;
require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->get('/api/test', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = "test";
    $response->getBody()->write(json_encode ($array));
    return $response;
});

$app->get('/api/login', function (Request $request, Response $response, $args) {
    return createJWT($response);
});

function createJWT(Response $response) : Response {
    $userid = 1;
    $email = 'super@test.fr';
    $pseudo = 'super';

    $issuedAt = time();
    $expirationTime = $issuedAt + 60;
    $payload = array(
        'userid' => $userid,
        'email' => $email,
        'pseudo' => $pseudo,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET);
    return $response->withHeader("Authorization", "Bearer {$token_jwt}");
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/hello", "/api/login"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();
