<?php

/**
 * Returns the list of cars.
 */
require 'Database.php';

class ListCar extends Database{
    
    public $req;
    
    public function query($statement){
        if($this->req === null){
            $req = parent::query($statement);
            $this->req = $req;
        }
    }
    
    public function getCars(){
        $this->query("SELECT id, model, price FROM cars");
        $req = $this->req;
        if($req) {
            $cars = [];
            $cr = 0;
            foreach ($req as $row) {
                $cars[$cr]['id']    = $row['id'];
                $cars[$cr]['model'] = $row['model'];
                $cars[$cr]['price'] = $row['price'];
                $cr++;
            }
            echo json_encode(['data' => $cars]);
            
        } else {
            http_response_code(404);
        }
        
    }
    
    
}
    
$list = new ListCar();
$list->getCars();