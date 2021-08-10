<?php

// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cars');

// Connect with the database.
function connect() {

    $connect = new PDO('mysql:host=localhost;dbname=cars;charset=utf8', DB_USER, DB_PASS, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    
    return $connect;
    
}

$con = connect();