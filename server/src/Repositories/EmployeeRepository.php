<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class EmployeeRepository extends BaseRepository
{
    protected static string $tableName = 'employees';

    public static function create(array $data): ?array
    {
        if (isset($data['passwordHash'])) $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT);
    
        if(isset($data['name']) && isset($data['email']) && isset($data['passwordHash']))
        {
            unset($data['token']);
            return parent::create($data); //Successful create   -> code: Created
        }
        return []; //Unsuccessful create, returning an empty array   -> code: Bad Request
    }

    public static function modifyShelterIdWhere_($shelterId)
    {
        $query = "UPDATE `" . static::$tableName . "` SET shelterId = -1 WHERE shelterId = $shelterId;";
        self::$mysqli->query($query);
    }
    
    public static function update(int $id, array $data)
    {
        $authSuccess = Authenticate::Auth($data, "adminoremployee", NULL, NULL, NULL, $id); //H: $data['id']-t nem küldök fel

        $employeeToUpdate = EmployeeRepository::getOne($id);
        if (array_key_exists('shelterId',$data) && $data['shelterId'] != $employeeToUpdate['shelterId']) //Shelter ID differs, admin token required to update
        {
            $authSuccess = Authenticate::Auth($data, "admin");

            if ($authSuccess == true)
            {
                if($data['shelterId']==null){//setting the shelter to null
                    $query = "UPDATE `" . static::$tableName . "` SET shelterId = NULL WHERE id = $id;";
                    self::$mysqli->query($query);
                    return self::getOne($id);
                }
                $shelter = ShelterRepository::getOne($data['shelterId']);
                if ($shelter === null) return ["Bad ShelterId"];
                else {
                    $newShelterID = $data['shelterId'];
                    $query = "UPDATE `" . static::$tableName . "` SET shelterId = $newShelterID WHERE id = $id;";
                    self::$mysqli->query($query);
                
                    return self::getOne($id);
                }
            }
            return ["Unauthorized"];   
        }
        else //Not updating shelter ID, employee token required (that one employee that we are updating, other employee tokens won't work)
        {
            $authSuccess = Authenticate::Auth($data, "employee", employeeId:$id); //H: you can edit your personal data

            if ($authSuccess == true)
            {
                unset($data['token']);

                if (isset($data['passwordHash'])) {
                    $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT);
                }
            
                $set = '';
                foreach ($data as $field => $value) {
                    if ($set != '') $set .= ", $field = '$value'";
                    else $set .= "$field = '$value'";
                }
            
                $query = "UPDATE `" . static::$tableName . "` SET $set WHERE id = $id;";
                self::$mysqli->query($query);
            
                return self::getOne($id);
            }
            return ["Unauthorized"];   
        }
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, NULL, NULL, $data['id']);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = self::$mysqli->query($query);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0) 
                {
                    TokenRepository::deleteWhere("userType = 'employee' AND userId = '$id'");
                    return "true";
                }
            }
            return "false";
        }
        return "Unauthorized";   
    }

    public static function getOne_Auth_($data, $requiredAccountType, $id, $token)
    {
        $data['token'] = $token;

        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, NULL, NULL, $id);

        if ($authSuccess == true)
        {
            $query = self::select() . "WHERE id = $id";
            return self::$mysqli->query($query)->fetch_assoc();
        }
        return ["Unauthorized"];   
    }
}