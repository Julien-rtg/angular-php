<?php

// db credentials
define('DB_USER', 'root');
define('DB_PASS', '');

// Connect with the database.

class Database {

    public $pdo;

    public function getPDO(){
        if ($this->pdo === null) {
            $pdo = new PDO('mysql:host=localhost;dbname=cars;charset=utf8', DB_USER, DB_PASS, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this->pdo = $pdo;
        }
        return $this->pdo;
    }

    public function query($statement){
        $req = $this->getPDO()->query($statement);
        return $req->fetchAll(PDO::FETCH_ASSOC);
    }

    public function prepare($statement){
        $req = $this->getPDO()->prepare($statement);
        return $req;
    }
}
