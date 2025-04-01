<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class PreferenceRepository extends BaseRepository
{
    protected static string $tableName = 'preferences';
    
    public static function create(array $data): ?array
    {
        if (
            isset($data['userId']) &&
            isset($data['age']) &&
            isset($data['ageWeight']) &&
            isset($data['weight']) &&
            isset($data['weightWeight']) &&
            isset($data['cuteness']) &&
            isset($data['cutenessWeight']) &&
            isset($data['childFriendlyness']) &&
            isset($data['childFriendlynessWeight']) &&
            isset($data['sociability']) &&
            isset($data['sociabilityWeight']) &&
            isset($data['exerciseNeed']) &&
            isset($data['exerciseNeedWeight']) &&
            isset($data['furLength']) &&
            isset($data['furLengthWeight']) &&
            isset($data['docility']) &&
            isset($data['docilityWeight'])
        )
        {
            unset($data['token']);
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

            $result = self::$mysqli->query($sql);
    
            if ($result) return ['success' => true, 'insert_id' => self::$mysqli->insert_id];
            else return ['success' => false, 'error' => self::$mysqli->error];
        }
        return []; //Unsuccessful create, returning an empty array   -> code: Bad Request
    }

    public static function getOne($id){
        $query = self::select() . "WHERE userId = $id";
        return self::$mysqli->query($query)->fetch_assoc();
    }

    public static function update(int $id, array $data)
    {
        $authSuccess = Authenticate::Auth($data, "user", NULL, $id);

        if ($authSuccess == true)
        {
            unset($data['token']);
            
            $set = '';
            foreach ($data as $field => $value)
            {
                if ($set > '') $set .= ", $field = '$value'";
                else $set .= "$field = '$value'";
            }

            $query = "UPDATE `" . static::$tableName . "` SET $set WHERE userId = $id;";
            self::$mysqli->query($query);

            return self::getOne($id);
        }
        return ["Unauthorized"];   
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, "user", NULL, $data['id']);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "UPDATE `" . static::$tableName . "` SET age = 15, ageWeight = 5, weight = 250, weightWeight = 15, cuteness = 5, cutenessWeight = 5, childFriendlyness = 5, childFriendlynessWeight = 5, sociability = 5, sociabilityWeight = 5, exerciseNeed = 5, exerciseNeedWeight = 5, furLength = 5, furLengthWeight = 5, docility = 5, docilityWeight = 5 WHERE userId = $id;";
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