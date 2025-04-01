<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class SpeciesRepository extends BaseRepository
{
    protected static string $tableName = 'species';

    public static function create(array $data): ?array
    {
        $authSuccess = Authenticate::Auth($data, "admin");

        if ($authSuccess == true)
        {
            if(isset($data['name']))
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
        $authSuccess = Authenticate::Auth($data, "admin");
        
        if ($authSuccess == true)
        {
            unset($data['token']);

            $set = '';
            foreach ($data as $field => $value)
            {
                if ($set > '')  $set .= ", $field = '$value'";
                else $set .= "$field = '$value'";
            }

            $query = "UPDATE `" . static::$tableName . "` SET $set WHERE id = $id;";
            self::$mysqli->query($query);

            return self::getOne($id);
        }
        return ["Unauthorized"];   
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = self::$mysqli->query($query);

            AnimalRepository::modifySpeciesWhere($id);
            BreedRepository::deleteBreedsWhere($id);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0) return "true";
            }
            return "false";
        }
        return "Unauthorized";   
    }

    public static function getAll(): array
    {
        $query = self::select(). " ORDER BY name";
        return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }
}