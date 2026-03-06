<?php
// Router sencillo para servir la SPA (frontend) desde backend/public
// y exponer los endpoints PHP de la API bajo el prefijo /bookit-api

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$apiPrefix = '/bookit-api';
$publicDir = __DIR__ . '/public';

if (strpos($uri, $apiPrefix) === 0) {
	// Petición hacia la API
	$relative = substr($uri, strlen($apiPrefix));
	if ($relative === '' || $relative === '/') {
		echo "API BookIt funcionando correctamente";
		exit();
	}
	$target = __DIR__ . $relative;
	if (file_exists($target) && is_file($target)) {
		if (substr($target, -4) === '.php') {
			include $target;
		} else {
			$mime = function_exists('mime_content_type') ? mime_content_type($target) : 'application/octet-stream';
			header('Content-Type: ' . $mime);
			readfile($target);
		}
		exit();
	}
	http_response_code(404);
	header('Content-Type: application/json; charset=UTF-8');
	echo json_encode(['error' => 'API route not found']);
	exit();
}

// Petición hacia el frontend (SPA)
$file = $publicDir . $uri;
if ($uri === '/' || $uri === '') {
	$file = $publicDir . '/index.html';
}
if (file_exists($file) && is_file($file)) {
	$mime = function_exists('mime_content_type') ? mime_content_type($file) : 'text/html';
	header('Content-Type: ' . $mime);
	readfile($file);
	exit();
}

// Fallback SPA routing: servir index.html si existe
$index = $publicDir . '/index.html';
if (file_exists($index)) {
	header('Content-Type: text/html');
	readfile($index);
	exit();
}

// Si no hay frontend construido, devolver mensaje simple
echo "API BookIt funcionando. No se encontró el build del frontend.";
