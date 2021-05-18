<?php
require_once'PDO_mysql.php';
abstract class model{
    protected $conn =null;
    public function __construct(){
        $this->conn =  PDO_mysql::getConnection();
    }
  }