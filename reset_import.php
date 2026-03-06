<?php
/**
 * reset_import.php
 * Uso: definir env vars DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
 * Ejecuta: php reset_import.php
 *
 * Lo que hace:
 * 1) conecta a la base de datos
 * 2) elimina todas las tablas existentes en la base de datos
 * 3) importa 'base-datos/bookit.sql'
 */

$host = getenv('DB_HOST') ?: '127.0.0.1';
$port = intval(getenv('DB_PORT') ?: 3306);
$user = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '';
$db   = getenv('DB_NAME') ?: 'bookit';

$sqlFile = __DIR__ . '/base-datos/bookit.sql';
if (!file_exists($sqlFile)) {
    fwrite(STDERR, "ERROR: SQL file not found: $sqlFile\n");
    exit(1);
}

$mysqli = mysqli_init();
if (!@$mysqli->real_connect($host, $user, $pass, $db, $port)) {
    fwrite(STDERR, "ERROR: Connect failed: ({$mysqli->connect_errno}) {$mysqli->connect_error}\n");
    exit(1);
}

// Obtener lista de tablas y borrarlas
$tablesRes = $mysqli->query("SHOW FULL TABLES WHERE Table_type = 'BASE TABLE'");
if ($tablesRes === false) {
    fwrite(STDERR, "ERROR: Could not list tables: ({$mysqli->errno}) {$mysqli->error}\n");
    $mysqli->close();
    exit(1);
}

$tables = [];
while ($row = $tablesRes->fetch_row()) {
    $tables[] = $row[0];
}

if (!empty($tables)) {
    fwrite(STDOUT, "Dropping existing tables...\n");
    // Desactivar checks de FK temporalmente
    $mysqli->query('SET FOREIGN_KEY_CHECKS = 0');
    foreach ($tables as $t) {
        $safe = $mysqli->real_escape_string($t);
        $mysqli->query("DROP TABLE IF EXISTS `{$safe}`");
    }
    $mysqli->query('SET FOREIGN_KEY_CHECKS = 1');
    fwrite(STDOUT, "Dropped " . count($tables) . " tables.\n");
} else {
    fwrite(STDOUT, "No existing tables found.\n");
}

// Import SQL file using multi_query
$sql = file_get_contents($sqlFile);
if ($sql === false) {
    fwrite(STDERR, "ERROR: Could not read SQL file.\n");
    $mysqli->close();
    exit(1);
}

if (!$mysqli->multi_query($sql)) {
    fwrite(STDERR, "ERROR: Multi query failed: ({$mysqli->errno}) {$mysqli->error}\n");
    $mysqli->close();
    exit(1);
}

// Consumir resultados
do {
    if ($res = $mysqli->store_result()) {
        $res->free();
    }
} while ($mysqli->more_results() && $mysqli->next_result());

if ($mysqli->errno) {
    fwrite(STDERR, "Finished with warnings/errors: ({$mysqli->errno}) {$mysqli->error}\n");
    $mysqli->close();
    exit(1);
}

fwrite(STDOUT, "Import completed successfully.\n");
$mysqli->close();
return 0;
