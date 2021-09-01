<?php

require 'Database.php';

class StoreCar extends Database{

    public $req;

    public function MyPDO(){
        $conn = parent::getPDO();
        $db = $conn->lastInsertId();
        
        return $db;
    }

    public function prepare($statement){
        $req = parent::prepare($statement);
        $this->req = $req;
    }

    public function store(){
        $post_data = file_get_contents("php://input");

        if(isset($post_data) && !empty($post_data)){
        
            $request = json_decode($post_data);
        
            if(trim($request->data->model) === '' || (int)$request->data->price < 1){
                return http_response_code(400);
            }
        
            $model = trim($request->data->model);
            $price = $request->data->price;

            $this->prepare("INSERT INTO cars (`id`, `model`, `price`) VALUES (null, '{$model}', '{$price}')");
            
            if($this->req->execute()){
                http_response_code(201);
                $car = [
                    'model' => $model,
                    'price' => $price,
                    'id' => $this->MyPDO(),
                ];
                echo json_encode(['data' => $car]);
            } else {
                http_response_code(422);
            }
        
        }
    }
    
}

$store = new StoreCar();
$store->store();