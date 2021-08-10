<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';

$cars = [];
$sql = "SELECT id, model, price FROM cars";

if($result = $con->query($sql)) {
    
    $cr = 0;
    while($row = $result->fetch(PDO::FETCH_ASSOC)) {
        $cars[$cr]['id']    = $row['id'];
        $cars[$cr]['model'] = $row['model'];
        $cars[$cr]['price'] = $row['price'];
        $cr++;
    }

    echo json_encode(['data'=>$cars]);
}
else {
  http_response_code(404);
  
}