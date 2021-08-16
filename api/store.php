<?php

require 'connect.php';

$post_data = file_get_contents("php://input");

if(isset($post_data) && !empty($post_data)){

    $request = json_decode($post_data);

    if(trim($request->data->model) === '' || (int)$request->data->price < 1){
        return http_response_code(400);
    }

    $model = trim($request->data->model);
    $price = $request->data->price;
    
    $statement = $con->prepare("INSERT INTO cars (`id`, `model`, `price`) VALUES (null, '{$model}', '{$price}')");

    if($statement->execute()){
        http_response_code(201);
        $car = [
            'model' => $model,
            'price' => $price,
            'id' => $con->lastInsertId()
        ];
        echo json_encode(['data' => $car]);
    } else {
        http_response_code(422);
    }


}