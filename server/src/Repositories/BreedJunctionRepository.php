<?php

namespace App\Repositories;

class BreedJunctionRepository extends BaseRepository
{
    protected static string $tableName = 'breedjunction';

    public static function create(array $data): ?array
    {
        if(isset($data['animalId']) && isset($data['breedId'])) return parent::create($data);
        else return [];
    }

    public static function getBreedsForAnimalId($animalID){
        $query = self::select()." WHERE animalId = $animalID";
        $obj = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        $breeds = [];
        foreach ($obj as $key => $value) {
            $breeds[] = $value['breedId'];
        }
        return $breeds;
    }

    public static function updateBreedsForAnimalId($animalID, $breeds){
        self::deleteBreedsForAnimalId($animalID);

        //Create new records
        if(count($breeds) > 0){
            $sql = "INSERT INTO `" . static::$tableName . "` (animalId, breedId) VALUES";
            foreach ($breeds as $key => $breedId) {
                $sql .= " ($animalID, $breedId),";
            }
            $sql = substr($sql, 0, strlen($sql)-1).';';
            self::$mysqli->query($sql);
        }
    }

    public static function deleteBreedsForAnimalId($animalID){
        $query = "DELETE FROM `" . static::$tableName . "` WHERE animalId = $animalID;";
        self::$mysqli->query($query);
    }

    public static function deleteBreedsWhere($breedId)
    {
        $query = "DELETE FROM `" . static::$tableName . "` WHERE breedId = $breedId;";
        self::$mysqli->query($query);
    }
}