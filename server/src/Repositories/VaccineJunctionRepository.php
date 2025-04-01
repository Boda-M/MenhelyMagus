<?php

namespace App\Repositories;

class VaccineJunctionRepository extends BaseRepository
{
    protected static string $tableName = 'vaccinejunction';

    public static function create(array $data): ?array
    {
        if(isset($data['animalId']) && isset($data['vaccineId'])) return parent::create($data);
        return [];
    }

    public static function getVaccinesForAnimalId($animalID){
        $query = self::select()." WHERE animalId = $animalID";
        $obj = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        $vaccines = [];
        foreach ($obj as $key => $value) {
            $vaccines[] = $value['vaccineId'];
        }
        return $vaccines;
    }

    public static function updateVaccinesForAnimalId($animalID, $vaccines){
        self::deleteVaccinesForAnimalId($animalID);

        //Create new records
        if(count($vaccines) > 0){
            $sql = "INSERT INTO `" . static::$tableName . "` (animalId, vaccineId) VALUES";
            foreach ($vaccines as $key => $vaccineId) {
                $sql .= " ($animalID, $vaccineId),";
            }
            $sql = substr($sql, 0, strlen($sql)-1).';';
            self::$mysqli->query($sql);
        }
    }

    public static function deleteVaccinesForAnimalId($animalID){
        $query = "DELETE FROM `" . static::$tableName . "` WHERE animalId = $animalID;";
        self::$mysqli->query($query);
    }

    public static function deleteVaccinesWhere($vaccineId)
    {
        $query = "DELETE FROM `" . static::$tableName . "` WHERE vaccineId = $vaccineId;";
        self::$mysqli->query($query);
    }
}