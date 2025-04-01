<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class AdoptionRepository extends BaseRepository
{
    protected static string $tableName = 'adoptions';

    public static function create(array $data): ?array
    {
        $authSuccess = Authenticate::Auth($data, "user", NULL, $data['userId']);

        if ($authSuccess == true)
        {
            $animalHabitats = HabitatJunctionRepository::getHabitatsForId($data['animalId']);

            $userHabitats = ProvideableHabitatsRepository::getHabitatsForId($data['userId']);

            if (empty(array_intersect($animalHabitats, $userHabitats))) return ["UserHabitatError"];
            
            if(isset($data['animalId']) && isset($data['userId']))
            {
                unset($data['token']);
                $data['pending'] = "1";
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
                
                if (static::$mysqli->query($sql))  return ['success' => true];
                return ['success' => false, 'error' => static::$mysqli->error];
            }
            return []; //Unsuccessful create, returning an empty array   -> code: Bad Request
        }
        return ["Unauthorized"];   
    }

    public static function rejectAdoption($data, $requiredAccountType, $animalId, $userId) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, $data['shelterId']);


        if ($authSuccess == true)
        {
            $query = "DELETE FROM `" . static::$tableName . "` WHERE animalId = $animalId AND userId = $userId;";
            $result = static::$mysqli->query($query);

            if ($result && static::$mysqli->affected_rows > 0) {
                return "true";
            }

            return "false";
        }
        return "Unauthorized";   
    }

    public static function acceptAdoption($data, $requiredAccountType, $animalId, $userId)
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, $data['shelterId']);
        if ($authSuccess == true)
        {
            $query = "UPDATE `" . static::$tableName . "` SET pending = '0' WHERE animalId = $animalId AND userId = $userId;";
            static::$mysqli->query($query);
        }
        else return ["Unauthorized"];   
    }

    public static function getIfAnimalIsAdopted($id)
    {
        $sql = "SELECT COUNT(*) AS count FROM `" . static::$tableName . "` WHERE animalId = " . intval($id) . ";";
        $result = static::$mysqli->query($sql);

        if ($result) {
            $row = $result->fetch_assoc();
            return $row['count'] > 0;
        }

        return false;
    }

    public static function getAdoptionsForShelter($data, $requiredAccountType, $employeeId) {
        $shelterId = EmployeeRepository::getOne($employeeId)['shelterId'];

        $authSuccess = Authenticate::Auth($data, "employee", $shelterId);

        if ($authSuccess == true) {
            $query = "SELECT adoptions.pending, adoptions.animalId, animals.gender AS `animalGender`, animals.birthDate AS `animalBirthDate`, FLOOR(GetAge(animals.birthDate)) AS `animalAge`, animals.name AS `animalName`, adoptions.userId, users.name AS `userName`, users.email AS `userEmail`, users.city AS `userCity`, users.street AS `userStreet`, users.houseNumber AS `userHouseNumber`, users.telephoneNumber AS `userTelephoneNumber`";
            $query .= "FROM `" . static::$tableName . "` ";
            $query .= "INNER JOIN animals ON animals.id = adoptions.animalId ";
            $query .= "INNER JOIN users ON users.id = adoptions.userId ";
            $query .= "WHERE animals.shelterId = $shelterId;";
            $adoptions = static::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);

            for ($i=0; $i < count($adoptions); $i++) { 
                $adoptions[$i]['img'] = static::loadImageAsBase64('img/' . $adoptions[$i]['animalId'] . '.jpg');
            }

            return $adoptions;
        }
        return ["Unauthorized"];   
    }
    public static function loadImageAsBase64($imagePath) {
        // Check if the file exists
        if (file_exists($imagePath)) {
            $imageData = file_get_contents($imagePath);
            return 'data:image/jpeg;base64,' . base64_encode($imageData);
        } else {
            $imageData = file_get_contents("img/noImage.png");
            return 'data:image/jpeg;base64,' . base64_encode($imageData);
        }
    }
}