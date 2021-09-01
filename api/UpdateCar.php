<?php

require 'Database.php';

class UpdateCar extends Database{

    public $req;

    public function prepare($statement){
        $req = parent::prepare($statement);
        $this->req = $req;
    }


    public function update(){
        $post_data = file_get_contents("php://input");
        
        if(isset($post_data) && !empty($post_data)){
        
            $request = json_decode($post_data);
        
            if((int)$request->data->id < 1 || trim($request->data->model) === '' || (int)$request->data->price < 1){
                return http_response_code(400);
            }
        
            $id = (int)$request->data->id;
            $model = trim($request->data->model);
            $price = (int)$request->data->price;
            
            $this->prepare("UPDATE `cars` SET `model`='$model', `price`=$price WHERE `id` = '{$id}' LIMIT 1");
        
            if($this->req->execute()){
                http_response_code(201);
            } else {
                http_response_code(422);
            }
        }

    }


}


$update = new UpdateCar();
$update->update();