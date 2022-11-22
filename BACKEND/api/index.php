<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

$app->post('/api/login', function (Request $request, Response $response) {
    $params = (array)$request->getParsedBody();
    $login = $params['login'];
    $password = $params['password'];

    $jwt = createJWT($login, $password);
    return $response->withHeader("Authorization", "Bearer $jwt");
});

function createJWT($login, $password) : string
{
    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'login' => $login,
        'password' => $password,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    return JWT::encode($payload, JWT_SECRET);
}

$app->get('/api/products', function (Request $request, Response $response) {
    $json = getProductsJSON();
    $response->getBody()->write($json);
    return $response;
});

function getProductsJSON() {
    return file_get_contents(__DIR__ . '\mock\catalogueMock.json');
}

$app->get('/api/product/{id}', function (Request $request, Response $response, $args) {
    $id = $args ['id'];
    $json = getProductsJSON();
    $products = json_decode($json, true);

    $product = filterArrayById($products, $id);
    $response->getBody()->write(json_encode($product));
    return $response;
});

function filterArrayById($array, $id)
{
    $filtered_array = array_filter($array, function ($elem) use ($id) {
        if (isset($elem['id'])) {
            return $elem['id'] == $id;
        }
        return false;
    });
    return current($filtered_array);
}

$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "regexp" => "/Bearer\s+(.*)$/i",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/api/login"],
    "error" => function ($response) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->addBodyParsingMiddleware();
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->add(new Tuupola\Middleware\CorsMiddleware([
    "origin" => ["*"],
    "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE"],
    "headers.allow" => ["Authorization", "Content-Type"],
    "headers.expose" => ["Authorization"],
]));

$app->run();