<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Firebase\JWT\JWT;

require __DIR__ . '/../vendor/autoload.php';
 
const JWT_SECRET = "makey1234567";

$app = AppFactory::create();

$app->post('/api/login', function (Request $request, Response $response) {
    return createJWT($request, $response);
});

function createJWT(Request $request, Response $response) : Response {
    $params = (array)$request->getParsedBody();
    $email = $params['email'];
    $login = $params['login'];

    $issuedAt = time();
    $expirationTime = $issuedAt + 600;
    $payload = array(
        'email' => $email,
        'login' => $login,
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload, JWT_SECRET);
    return $response->withHeader("Authorization", "Bearer $token_jwt");
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
    "ignore" => ["/api/hello", "/api/login", "/api/products", "/api/product/"],
    "error" => function ($response) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];

$app->add(new Tuupola\Middleware\CorsMiddleware);
$app->add(new Tuupola\Middleware\JwtAuthentication($options));

$app->run();
