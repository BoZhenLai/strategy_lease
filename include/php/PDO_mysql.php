<?php

class PDO_mysql {

    static $db_host;
    static $db_user;
    static $db_name;
    static $db_password;

    static function getConnection() {
        $dsn = sprintf("mysql:host=%s;dbname=%s;charset=utf8", self::$db_host, self::$db_name);
        try {
            $conn = new PDO($dsn, self::$db_user, self::$db_password);
            return $conn;
        } catch (PDOException $e) {
            echo $e->getMessage();
        }
    }

}

?>