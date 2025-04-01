<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class FavouritesRepository extends BaseRepository
{
    protected static string $tableName = 'favourites';

    public static function create(array $data): ?array
    {
        $authSuccess = Authenticate::Auth($data, "user", NULL, $data['userId']);

        if ($authSuccess == true)
        {
            if(isset($data['animalId']) && isset($data['userId']))
            {
                unset($data['token']);
                $fields = '';
                $values = '';
                $i = 0;
                foreach ($data as $field => $value) {
                    $fields .= $field;
                    $values .= "\"$value\"";

                    if ($i++ < count($data) - 1) {
                        $fields .= ', ';
                        $values .= ', ';
                    }
                }

                $sql = "INSERT INTO `" . static::$tableName . "` ($fields) VALUES ($values)";
                if (self::$mysqli->query($sql)) {
                    // Return some relevant information as an array if needed
                    return ['success' => true];
                } else {
                    // Return an error message as an array
                    return ['success' => false, 'error' => self::$mysqli->error];
                }
            }
            return []; //Unsuccessful create, returning an empty array   -> code: Bad Request
        }
        return ["Unauthorized"];   
    }

    public static function getIfFavouriteExists($animalId, $userId) : bool
    {
        $query = "SELECT COUNT(*) AS count FROM `" . static::$tableName . "` WHERE ( animalId = $animalId ) AND ( userId = $userId );";
        $result = self::$mysqli->query($query)->fetch_assoc();
        
        if ($result && $result['count'] > 0) return true;
        return false;
    }

    public static function deleteOne_($data, $requiredAccountType, $animalId, $userId) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, $userId);

        if ($authSuccess == true)
        {

            $query = "DELETE FROM `" . static::$tableName . "` WHERE animalId = $animalId AND userId = $userId;";
            $result = self::$mysqli->query($query);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0) return "true";
            }

            return "false";
        }
        return "Unauthorized";   
    }
}