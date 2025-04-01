<?php

namespace App\Repositories;

class HabitatJunctionRepository extends BaseRepository
{
    protected static string $tableName = 'habitatjunction';

    public static function create(array $data): ?array
    {
        if(isset($data['animalId']) && isset($data['habitatId'])) return parent::create($data);
        return [];
    }

    public static function getHabitatsForAnimalId($animalID){
        $query = self::select()." WHERE animalId = $animalID";
        $obj = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        $habitats = [];
        foreach ($obj as $key => $value) {
            $habitats[] = $value['habitatId'];
        }
        return $habitats;
    }

    public static function updateHabitatsForAnimalId($animalID, $habitats){
        self::deleteHabitatsForAnimalId($animalID);

        //Create new records
        if(count($habitats) > 0){
            $sql = "INSERT INTO `" . static::$tableName . "` (animalId, habitatId) VALUES";
            foreach ($habitats as $key => $habitatId) {
                $sql .= " ($animalID, $habitatId),";
            }
            $sql = substr($sql, 0, strlen($sql)-1).';';
            self::$mysqli->query($sql);
        }
    }

    public static function deleteHabitatsForAnimalId($animalID){
        $query = "DELETE FROM `" . static::$tableName . "` WHERE animalId = $animalID;";
        self::$mysqli->query($query);
    }

    public static function deleteHabitatsWhere($habitatId)
    {
        $query = "DELETE FROM `" . static::$tableName . "` WHERE habitatId = $habitatId;";
        self::$mysqli->query($query);
    }

    public static function getHabitatsForId($id)
    {
        $query = "SELECT habitatId FROM `" . static::$tableName . "` WHERE animalId = $id;";
        $result = self::$mysqli->query($query);

        $habitats = [];
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $habitats[] = $row['habitatId'];
            }
        }
        return $habitats;
    }
}