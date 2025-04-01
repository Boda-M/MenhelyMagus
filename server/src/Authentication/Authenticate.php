<?php
namespace App\Authentication;

use App\Repositories\AdminRepository;
use App\Repositories\EmployeeRepository;
use App\Repositories\UserRepository;
use App\Repositories\TokenRepository;

require 'vendor/autoload.php';

class Authenticate
{
    public static function login($data)
    {
        $token = "nothing";

        $admins = AdminRepository::getAllWhere($data['email'], 'email');
        $employees = EmployeeRepository::getAllWhere($data['email'], 'email');
        $users = UserRepository::getAllWhere($data['email'], 'email');

        if (count($admins) != 0) //The user tried to log in with an existing admin email
        {
            $admin = $admins[0];
            if (password_verify($data['password'], $admin['passwordHash'])) //The user gave the correct password
            {
                $token = bin2hex(random_bytes(16)); //Generating the token
                $id = $admin['id'];

                $tokenData = [
                    'userId' => $id,
                    'userType' => 'admin',
                    'token' => $token
                ];

                TokenRepository::create($tokenData); //Creating a token in the database
            }
        }
        else if (count($employees) != 0) //The user tried to log in with an existing employee email
        {
            $employee = $employees[0];
            if (password_verify($data['password'], $employee['passwordHash'])) //The user gave the correct password
            {
                $token = bin2hex(random_bytes(16)); //Generating the token
                $id = $employee['id'];

                $tokenData = [
                    'userId' => $id,
                    'userType' => 'employee',
                    'token' => $token
                ];

                TokenRepository::create($tokenData); //Creating a token in the database
            }
        }
        else if (count($users) != 0) //The user tried to log in with an existing user email
        {
            $user = $users[0];
            if (password_verify($data['password'], $user['passwordHash'])) //The user gave the correct password
            {
                $token = bin2hex(random_bytes(16)); //Generating the token
                $id = $user['id'];

                $tokenData = [
                    'userId' => $id,
                    'userType' => 'user',
                    'token' => $token
                ];
                TokenRepository::create($tokenData); //Creating a token in the database
            }
        }
        return $token;
    }

    public static function Auth($data, $userType, $shelterId = NULL, $userId = NULL, $adminId = NULL, $employeeId = NULL) //Expects the data (like data of the animal to edit), required usertype, and OPTIONAL id parameters
    {
        if (isset($data['token']))
        {
            $token = TokenRepository::getOne($data['token']);
            if ($token == null) return false; //The token did not exist   -> returning false
    
            if ($token['userType'] == $userType)
            {
                if ($userType == "employee")
                {
                    if (!is_null($shelterId))
                    {
                        $employee = EmployeeRepository::getOne($token['userId']);
                        if ($employee['shelterId'] == $shelterId) //Checking if required shelter id equals to the shelter id of the employee of the token
                        {
                            return true; //Shelter ids are equal, everything was fine during the authorization   -> returning true
                        }
                        else
                        {
                            return false; //Shelter ids aren't equal   -> returning false
                        }
                    }
                    elseif (!is_null($employeeId))
                    {
                        $employee = EmployeeRepository::getOne($token['userId']);
                        if ($employee['id'] == $employeeId) //Checking if required Employee id equals to the Employee id of the employee of the token
                        {
                            return true; //Employee ids are equal, everything was fine during the authorization   -> returning true
                        }
                        else
                        {
                            return false; //Employee ids aren't equal   -> returning false
                        }
                    }
                }
                if ($userType == "user")
                {
                    $user = UserRepository::getOne($token['userId']);
                    if ($user['id'] == $userId) //Checking if required user id equals to the user id of the user of the token
                    {
                        return true; //User ids are equal, everything was fine during the authorization   -> returning true
                    }
                    else
                    {
                        return false; //User ids aren't equal   -> returning false
                    }
                }
                if ($adminId != NULL)
                {
                    if ($token['userId'] == $adminId) //Checking if required admin id equals to the user id of the admin of the token
                    {
                        return true; //admin ids are equal, everything was fine during the authorization   -> returning true
                    }
                    else
                    {
                        return false; //admin ids aren't equal   -> returning false
                    }
                }
                return true; //Everything was fine during the authorization   -> returning true
            }
            else
            {
                if ($userType == "adminoremployee") //Admins or the specific one employee can have permission to it
                {
                    if ($token['userType'] == "admin") return true;

                    if ($token['userType'] == "employee" && $token['userId'] == $employeeId) return true;
                }
                if ($userType == "adminoruser") //Admins or the specific one user can have permission to it
                {
                    if ($token['userType'] == "admin") return true;

                    if ($token['userType'] == "user" && $token['userId'] == $userId) return true;
                }
                return false; //The token exists, but the userType is not right   -> returning false
            }
        }
        return false; //Missing token parameter   -> returning false
    }
}