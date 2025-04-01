<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class AdminRepository extends BaseRepository
{
    protected static string $tableName = 'admins';

    
    public static function create(array $data): ?array
    {
        $authSuccess = Authenticate::Auth($data, "admin");

        if ($authSuccess == true)
        {
            if (isset($data['passwordHash'])) { $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT); }
            
            if(isset($data['name']) && isset($data['email']) && isset($data['passwordHash']))
            {
                unset($data['token']);
                return parent::create($data);
            }
            return []; //Unsuccessful create, returning an empty array   -> code: Bad Request
        }
        return ["Unauthorized"];   
    }
    
    public static function update(int $id, array $data)
    {
        $authSuccess = Authenticate::Auth($data, "admin", NULL, NULL, $id);

        if ($authSuccess)
        {
            unset($data['token']);

            if (isset($data['passwordHash'])) {
                $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT);
            }
        
            $set = '';
            foreach ($data as $field => $value) {
                if ($set != '') {
                    $set .= ", $field = '$value'";
                } else {
                    $set .= "$field = '$value'";
                }
            }
        
            $query = "UPDATE `" . static::$tableName . "` SET $set WHERE id = $id;";
            static::$mysqli->query($query);
        
            return static::getOne($id);
        }
        return ["Unauthorized"];   
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, NULL, $data['id']);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = static::$mysqli->query($query);

            TokenRepository::deleteWhere("userType = 'admin' AND userId = '$id'");

            if ($result) 
            {
                if (static::$mysqli->affected_rows > 0) return "true";
            }

            return "false";
        }
        return "Unauthorized";   
    }
 }