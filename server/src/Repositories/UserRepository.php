<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class UserRepository extends BaseRepository
{
    protected static string $tableName = 'users';

    public static function getOneByName($name)
    {
        $query = self::select() . "WHERE name = $name";
        return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }

    public static function getOneByMail($mail)
    {
        $query = self::select() . "WHERE email = $mail";
        return self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
    }

    public static function create(array $data): ?array
    {
        if (isset($data['passwordHash'])) $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT);

        if(isset($data['email']) && isset($data['passwordHash']) && isset($data['name']) && isset($data['telephoneNumber']) && isset($data['city']) && isset($data['street']) && isset($data['houseNumber']) && isset($data['wantsEmail']))
        {
            $habitatIds = null;
            if(isset($data['provideablehabitats'])){
                $habitatIds = $data['provideablehabitats'];
                unset($data['provideablehabitats']);
            }

            $new = parent::create($data);

            if($habitatIds && count($habitatIds)>0) ProvideableHabitatsRepository::addNewHabitatsForId($new['id'], $habitatIds);

            $prefData = [
                'userId' => $new['id'],
                'age' => 15,
                'ageWeight' => 0,
                'weight' => 250,
                'weightWeight' => 0,
                'cuteness' => 5,
                'cutenessWeight' => 0,
                'childFriendlyness' => 5,
                'childFriendlynessWeight' => 0,
                'sociability' => 5,
                'sociabilityWeight' => 0,
                'exerciseNeed' => 5,
                'exerciseNeedWeight' => 0,
                'furLength' => 5,
                'furLengthWeight' => 0,
                'docility' => 5,
                'docilityWeight' => 0
            ];
            PreferenceRepository::create($prefData);

            return $new;
        }
        return [];
    }
    
    public static function update(int $id, array $data)
    {
        $authSuccess = Authenticate::Auth($data, "adminoruser", NULL, $id);

        if ($authSuccess == true)
        {
            if (isset($data['habitats']))
            {
                $habitats = $data['habitats'];
                unset($data['habitats']);
                ProvideableHabitatsRepository::deleteHabitatsWhereUserId($id);
                ProvideableHabitatsRepository::addNewHabitatsForId($id,$habitats);
            }
            unset($data['token']);
            if (isset($data['passwordHash'])) $data['passwordHash'] = password_hash($data['passwordHash'], PASSWORD_DEFAULT);
        
            $set = '';
            foreach ($data as $field => $value) {
                if ($set != '')  $set .= ", $field = '$value'";
                else  $set .= "$field = '$value'";
            }
        
            $query = "UPDATE `" . static::$tableName . "` SET $set WHERE id = $id;";
            self::$mysqli->query($query);
        
            return self::getOne($id);
        }
        return ["Unauthorized"];   
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, $data['id']);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = self::$mysqli->query($query);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0)
                {
                    TokenRepository::deleteWhere("userType = 'user' AND userId = '$id'");
                    ProvideableHabitatsRepository::deleteHabitatsWhereUserId($data['id']);
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
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, NULL, $id);

        if ($authSuccess == true)
        {
            $query = self::select() . "WHERE id = $id";
            $result = self::$mysqli->query($query)->fetch_assoc();
            $result['habitats'] = ProvideableHabitatsRepository::getHabitatsForId($id);
            return $result;
        }
        return ["Unauthorized"];   
    }
 }