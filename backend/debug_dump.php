<?php
// debug_dump.php
// Muestra el contenido del archivo configuracion/conexion.php como texto
// No incluye/ejecuta el archivo para evitar el parse error
header('Content-Type: text/plain; charset=UTF-8');
$path = __DIR__ . '/configuracion/conexion.php';
if (!file_exists($path)) {
    http_response_code(404);
    echo "NO ENCONTRADO: $path\n";
    exit;
}
echo "=== RUTA: $path ===\n\n";
echo file_get_contents($path);
