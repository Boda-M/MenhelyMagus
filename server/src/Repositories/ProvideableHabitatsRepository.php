<?php

namespace App\Repositories;

class ProvideableHabitatsRepository extends BaseRepository
{
    protected static string $tableName = 'provideablehabitats';

    public static function create(array $data): ?array
    {
        if(isset($data['userId']) && isset($data['habitatId'])) return parent::create($data);
        return [];
    }

    public static function addNewHabitatsForId($userId, $habitats)
    {
        //Create new records
        if(count($habitats) > 0){
            $sql = "INSERT INTO `" . static::$tableName . "` (userId, habitatId) VALUES";
            foreach ($habitats as $key => $habitatId) {
                $sql .= " ($userId, $habitatId),";
            }
            $sql = substr($sql, 0, strlen($sql)-1).';';
            self::$mysqli->query($sql);
        }
    }

    public static function deleteHabitatsWhere($habitatId)
    {
        $query = "DELETE FROM `" . static::$tableName . "` WHERE habitatId = $habitatId;";
        self::$mysqli->query($query);
    }

    public static function deleteHabitatsWhereUserId($userId)
    {
        $query = "DELETE FROM `" . static::$tableName . "` WHERE userId = $userId;";
        self::$mysqli->query($query);
    }

    public static function getHabitatsForId($id)
    {
        $query = "SELECT habitatId FROM `" . static::$tableName . "` WHERE userId = $id;";
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