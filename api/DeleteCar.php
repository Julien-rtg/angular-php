<?php

require 'Database.php';

class DeleteCar extends Database{

    public $req;

    public function prepare($statement){
        $req = parent::prepare($statement);
        $this->req = $req;
    }

    public function delete(){
        // Extract, validate and sanitize the id.
        $id = ($_GET['id'] !== null && (int)$_GET['id'] > 0) ? (int)$_GET['id'] : false;
        
        if(!$id){
            return http_response_code(400);
        }
        
        // Delete.
        $this->prepare("DELETE FROM `cars` WHERE `id` = '{$id}' LIMIT 1");
        
        if($this->req->execute()){
            http_response_code(204);
        }
        else {
            return http_response_code(422);
        }
    }

}

$delete = new DeleteCar();
$delete->delete();