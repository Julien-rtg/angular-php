<?php

require 'connect.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0) ? (int)$_GET['id'] : false;

if(!$id){
    return http_response_code(400);
}

// Delete.
$stmt = $con->prepare("DELETE FROM `cars` WHERE `id` = '{$id}' LIMIT 1");


if($stmt->execute()){
    http_response_code(204);
}
else {
    return http_response_code(422);
}