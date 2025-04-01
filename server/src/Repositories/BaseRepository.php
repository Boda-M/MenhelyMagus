<?php
namespace App\Repositories;

use App\Authentication\Authenticate;

use App\Database\DB;

class BaseRepository extends DB // implements
{
    protected static string $tableName;

    public static function initDB()
    {
        if (!self::$mysqli) {
            new DB();
        }
    }

    public static function select()
    {
        return "SELECT * FROM `" . static::$tableName . "` ";
    }

    public static function getAll(): array
    {
        $query = self::select();
        return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }

    public static function getOne($id){
        $query = self::select() . "WHERE id = $id";
 
        return self::$mysqli->query($query)->fetch_assoc();
    }

    public static function getLatestId(){
        $query = "SELECT MAX(id) FROM `" . static::$tableName . "`";
        return self::$mysqli->query($query)->fetch_assoc()['MAX(id)'];
    }

    public static function getCount(){
        $query = "SELECT COUNT(*) FROM `" . static::$tableName . "`";
        return self::$mysqli->query($query)->fetch_assoc()['COUNT(*)'];
    }

    public static function getAllWhere($search, $where){
        $query = self::select() . " WHERE $where = '" . self::$mysqli->real_escape_string($search) . "'";  // Properly escape and wrap in quotes
        return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = self::$mysqli->query($query);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0) return "true";
            }

            return "false";
        }
        return "Unauthorized";   
    }

    public static function deleteOneLogout($id) : bool
    {
       $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
       return self::$mysqli->query($query);
    }

    public static function deleteWhere($selector){
        $query = self::select() . " WHERE $selector";
        $matchingRecords = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        foreach ($matchingRecords as $index => $record) 
        {
            $id = $record['id'];
            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = '$id'";
            self::$mysqli->query($query);
        }
    }

    public static function update(int $id, array $data)
    {
        $set = '';
        foreach ($data as $field => $value)
        {
            if ($set > '') $set .= ", $field = '$value'";
            else $set .= "$field = '$value'";
        }

        $query = "UPDATE `" . static::$tableName . "` SET $set WHERE id = $id;";
        self::$mysqli->query($query);

        return self::getOne($id);
    }

    public static function create(array $data): ?array
    {
        $fields = '';
        $values = '';
        $i = 0;
        foreach ($data as $field => $value)
        {
            $fields .= $field;
            $values .= "\"$value\"";
            
            if($i++ < count($data) - 1){
                $fields .= ', ';
                $values .= ', ';
            }
        }
        $sql = "INSERT INTO `" . static::$tableName . "` ($fields) VALUES ($values)";
        self::$mysqli->query($sql);
        $lastInsertedIdObj = self::$mysqli->query("SELECT LAST_INSERT_ID() id;")->fetch_assoc();
        $lastInsertedId = isset($lastInsertedIdObj['id'])?$lastInsertedIdObj['id']:-1;
        
        return self::getOne($lastInsertedId);
    }

    public static function getAll_Auth($data, $requiredAccountType): array
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType);

        if ($authSuccess == true)
        {
            $query = self::select();
            return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        }
        return ["Unauthorized"];   
    }

    public static function getOne_Auth($data, $requiredAccountType){
        $authSuccess = Authenticate::Auth($data, $requiredAccountType);

        $id = $data['id'];

        if ($authSuccess == true)
        {
            $query = self::select() . "WHERE id = $id";
            return self::$mysqli->query($query)->fetch_assoc();
        }
        return ["Unauthorized"];   
    }
}

