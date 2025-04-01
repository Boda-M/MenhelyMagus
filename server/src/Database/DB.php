<?php
namespace App\Database;
class DB
{
    const HOST = 'localhost:3306';
    const USER = 'root';
    const PASSWORD = null;
    const DATABASE = 'menhelymagus';

    protected static $mysqli;

    function __construct($host = self::HOST, $user = self::USER, $password = self::PASSWORD, $database = self::DATABASE)
    {
        self::$mysqli = mysqli_connect($host, $user, $password, $database);

        if (!self::$mysqli)
        {
            die("Connection failed: " . mysqli_connect_error());
        }
        self::$mysqli->set_charset("utf8mb4");
    }
}