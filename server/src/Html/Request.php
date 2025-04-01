<?php
 
namespace App\Html;

use App\Repositories\EmployeeRepository;
use App\Repositories\AnimalRepository;
use App\Repositories\HabitatRepository;
use App\Repositories\SpeciesRepository;
use App\Repositories\BreedRepository;
use App\Repositories\UserRepository;
use App\Repositories\ShelterRepository;
use App\Repositories\VaccineRepository;
use App\Repositories\AdminRepository;
use App\Repositories\TokenRepository;
use App\Repositories\FavouritesRepository;
use App\Repositories\PreferenceRepository;
use App\Repositories\AdoptionRepository;
use App\Authentication\Authenticate;

class Request
{
    static function handle()
    {
        switch ($_SERVER["REQUEST_METHOD"]){
            case "POST":
                self::postRequest();
                break;
            case "PUT":
                self::putRequest();
                break;
            case "GET":
                self::getRequest();
                break;
            case "DELETE":
                self::deleteRequest();
                break;
            default:
                echo 'Unknown request type';
                break;
        }
    }

    private static function postRequest()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $parameters = self::getArguments($uri);

        $entities = [];
        $code = 404;
        $data = self::getRequestData();
        $newRecord = null;

        $differentRequest = false;
        $meta = null;

        if(self::matchUri($uri, "/employees", $parameters)){
            $newRecord = EmployeeRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == "Unauthorized")$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/shelters", $parameters)){
            $newRecord = ShelterRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/animals", $parameters)){
            $newRecord = AnimalRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else {
                $code = 201;
                $newRecord['id'] = AnimalRepository::getMaxId();
            }
        }if(self::matchUri($uri, "/animalsPaginator/{howMany}/{page}", $parameters)){
            $entities = AnimalRepository::paginator($parameters, $data, $meta);
            $code = 200;
            $differentRequest = true;
        }else if(self::matchUri($uri, "/species", $parameters)){
            $newRecord = SpeciesRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/breeds", $parameters)){
            $newRecord = BreedRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == "Unauthorized")$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/vaccines", $parameters)){
            $newRecord = VaccineRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/habitats", $parameters)){
            $newRecord = HabitatRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/admins", $parameters)){
            $newRecord = AdminRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/users", $parameters)){
            $newRecord = UserRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            else $code = 201;
        }else if(self::matchUri($uri, "/favourites", $parameters)){
            $newRecord = FavouritesRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/adoptions", $parameters)){
            $newRecord = AdoptionRepository::create($data);
            if(count($newRecord) == 0)$code = 400;
            if ($newRecord == ["Unauthorized"])$code = 401;
            else $code = 201;
        }else if(self::matchUri($uri, "/email", $parameters)){

            $emails = UserRepository::getAll();
            $emails = array_merge($emails, AdminRepository::getAll());
            $emails = array_merge($emails, EmployeeRepository::getAll());
            $emails = array_merge($emails, ShelterRepository::getAll());

            $emailAlreadyUsed = false;
            for ($i=0; $i < count($emails); $i++) {
                if (!$emailAlreadyUsed) $emailAlreadyUsed = ($emails[$i]['email'] == $data['email']);
            }
            $entities = [$emailAlreadyUsed];
        
            $code = !$emailAlreadyUsed ? 200 : 406;

            $differentRequest = true;
        }else if(self::matchUri($uri, "/adoptions/{id}", $parameters)){
            $entities = AdoptionRepository::getAdoptionsForShelter($data, "employee", $parameters['id']);
            $differentRequest = true;
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            else $code = 200;                                                               
        }else if(self::matchUri($uri, "/login", $parameters)){
            $newRecord = Authenticate::login($data);
            if ($newRecord == "nothing")$code = 400; //Login failed
            else $code = 200; //Succesful login
        }

        if (!$differentRequest) Response::response(['new' => $newRecord], $code);
        else Response::response($entities, $code, '', $meta);
    }

    private static function putRequest()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $parameters = self::getArguments($uri);

        $code = 404;
        $data = self::getRequestData();
        $updatedRecord = [];
        $badShelter = false;
        
        if(self::matchUri($uri, "/employees/{id}", $parameters)){
            $updatedRecord = EmployeeRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord) || $updatedRecord == ["Bad ShelterId"]) { $code = 400; $badShelter = true; }      
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/shelters/{id}", $parameters)){
            $updatedRecord = ShelterRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/animals/{id}", $parameters)){
            $updatedRecord = AnimalRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/species/{id}", $parameters)){
            $updatedRecord = SpeciesRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/breeds/{id}", $parameters)){
            $updatedRecord = BreedRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/vaccines/{id}", $parameters)){
            $updatedRecord = VaccineRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/habitats/{id}", $parameters)){
            $updatedRecord = HabitatRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/admins/{id}", $parameters)){
            $updatedRecord = AdminRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/users/{id}", $parameters)){
            $updatedRecord = UserRepository::update($parameters['id'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/adoptions/{animalId}/{userId}", $parameters)){
            $animal = AnimalRepository::getOne($parameters['animalId']);
            $data['shelterId'] = $animal['shelterId'];
            $updatedRecord = AdoptionRepository::acceptAdoption($data,"employee",$parameters['animalId'],$parameters['userId']);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            else $code = 200;                                                                         
        }else if(self::matchUri($uri, "/preferences/{userId}", $parameters)){
            $updatedRecord = PreferenceRepository::update($parameters['userId'], $data);
            if (is_array($updatedRecord) && in_array("Unauthorized", $updatedRecord))$code = 401;     
            elseif(!is_array($updatedRecord))$code = 400;                                             
            else $code = 200;                                                                         
        }


        if ($badShelter) Response::response(["error" => $updatedRecord], $code);
        else Response::response(["updated" => $updatedRecord], $code);
    }

    private static function deleteRequest()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $parameters = self::getArguments($uri);

        $code = 404;

        $data = self::getRequestData();
        if (self::matchUri($uri, "/{something}/{id}", $parameters))
        {
            if (array_key_exists('id',$parameters))
            {
                $data['id'] = $parameters['id'];
            }
        }

        if(self::matchUri($uri, "/employees/{id}", $parameters)){
            $deletedResult = EmployeeRepository::deleteOne($data, "adminoremployee");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/shelters/{id}", $parameters)){
            $deletedResult = ShelterRepository::deleteOne($data, "admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/animals/{id}", $parameters)){
            $deletedResult = AnimalRepository::deleteOne($data, "employee");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/species/{id}", $parameters)){
            $deletedResult = SpeciesRepository::deleteOne($data, "admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/breeds/{id}", $parameters)){
            $deletedResult = BreedRepository::deleteOne($data, "admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/vaccines/{id}", $parameters)){
            $deletedResult = VaccineRepository::deleteOne($data,"admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/habitats/{id}", $parameters)){
            $deletedResult = HabitatRepository::deleteOne($data,"admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/admins/{id}", $parameters)){
            $deletedResult = AdminRepository::deleteOne($data,"admin");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/users/{id}", $parameters)){
            $deletedResult = UserRepository::deleteOne($data,"adminoruser");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/preferences/{userId}", $parameters)){
            $deletedResult = PreferenceRepository::deleteOne($data,"user");
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/favourites/{animalId}/{userId}", $parameters)){
            $deletedResult = FavouritesRepository::deleteOne_($data,"user",$parameters['animalId'],$parameters['userId']);
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/adoptions/{animalId}/{userId}", $parameters)){
            $animal = AnimalRepository::getOne($parameters['animalId']);
            $data['shelterId'] = $animal['shelterId'];
            $deletedResult = AdoptionRepository::rejectAdoption($data,"employee",$parameters['animalId'],$parameters['userId']);
            if ($deletedResult == "Unauthorized")$code = 401;
            if ($deletedResult == "false")$code = 400;
            if ($deletedResult == "true")$code = 200;
        }else if(self::matchUri($uri, "/logout/{id}", $parameters)){
            TokenRepository::deleteOneLogout($parameters['id']);
            $code = 200;
        }
        Response::response([], $code);
    }

    private static function getRequest()
    {
        $uri = $_SERVER['REQUEST_URI'];
        $parameters = self::getArguments($uri);

        $entities = [];
        $code = 404;

        $data = self::getRequestData();
        if (self::matchUri($uri, "/{something}/{id}", $parameters))
        {
            if (array_key_exists('id',$parameters)) $data['id'] = $parameters['id'];
        }

        if(self::matchUri($uri, "/animals", $parameters)){
            if(isset($parameters["id"]))$entities = AnimalRepository::getOne($parameters['id']);
            else $entities = AnimalRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/animals/{id}", $parameters)){
            $entities = AnimalRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/numberofanimals", $parameters)){
            $entities = AnimalRepository::getCount();
            $code = 200;
        }else if(self::matchUri($uri, "/employees/{token}", $parameters)){
            $data['token'] = $parameters['token'];
            $entities = EmployeeRepository::getAll_Auth($data,"admin");
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/numberofemployees", $parameters)){
            $entities = EmployeeRepository::getCount();
            $code = 200;                                                                                             
        }else if(self::matchUri($uri, "/employees/{id}/{token}", $parameters)){
            $entities = EmployeeRepository::getOne_Auth_($data,"employee",$parameters['id'],$parameters['token']);
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/shelters", $parameters)){
            if(isset($parameters["id"]))$entities = ShelterRepository::getOne($parameters['id']);
            else $entities = ShelterRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/shelters/{id}", $parameters)){
            $entities = ShelterRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/numberofshelters", $parameters)){
            $entities = ShelterRepository::getCount();
            $code = 200;                                                                                             
        }else if(self::matchUri($uri, "/admins", $parameters)){
            $entities = AdminRepository::getAll_Auth($data,"admin");
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/admins/{id}/{token}", $parameters)){
            $data['token'] = $parameters['token'];
            $data['id'] = $parameters['id'];
            $entities = AdminRepository::getOne_Auth($data,"admin");
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/users/{token}", $parameters)){
            $data['token'] = $parameters['token'];
            $entities = UserRepository::getAll_Auth($data,"admin");
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/users/{id}/{token}", $parameters)){
            $entities = UserRepository::getOne_Auth_($data,"adminoruser", $parameters['id'], $parameters['token']);
            if (is_array($entities) && in_array("Unauthorized", $entities))$code = 401;     
            elseif(!is_array($entities))$code = 400;                                                          
            else $code = 200;                                                                                        
        }else if(self::matchUri($uri, "/preferences", $parameters)){
            $entities = PreferenceRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/preferences/{userId}", $parameters)){
            $entities = PreferenceRepository::getOne($parameters['userId']);
            $code = 200;
        }else if(self::matchUri($uri, "/species", $parameters)){
            if(isset($parameters["id"]))$entities = SpeciesRepository::getOne($parameters['id']);
            else $entities = SpeciesRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/species/{id}", $parameters)){
            $entities = SpeciesRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/numberofspecies", $parameters)){
            $entities = SpeciesRepository::getCount();
            $code = 200;                                                                                             
        }else if(self::matchUri($uri, "/breeds", $parameters)){
            if(isset($parameters["id"]))$entities = BreedRepository::getOne($parameters['id']);
            else if(isset($parameters["speciesId"]))$entities = BreedRepository::getAllForSpecies($parameters["speciesId"]);
            else $entities = BreedRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/breeds/{id}", $parameters)){
            $entities = BreedRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/breeds/species/{speciesId}", $parameters)){
            $entities = BreedRepository::getAllForSpecies($parameters['speciesId']);
            $code = 200;
        }else if(self::matchUri($uri, "/vaccines", $parameters)){
            if(isset($parameters["id"]))$entities = VaccineRepository::getOne($parameters['id']);
            else $entities = VaccineRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/vaccines/{id}", $parameters)){
            $entities = VaccineRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/vaccines/species/{speciesId}", $parameters)){
            $entities = VaccineRepository::getAllWhere($parameters['speciesId'], 'speciesId');
            $code = 200;
        }else if(self::matchUri($uri, "/habitats", $parameters)){
            if(isset($parameters["id"]))$entities = HabitatRepository::getOne($parameters['id']);
            else $entities = HabitatRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/habitats/{id}", $parameters)){
            $entities = HabitatRepository::getOne($parameters['id']);
            $code = 200;
        }else if(self::matchUri($uri, "/favourites", $parameters)){
            $entities = FavouritesRepository::getAll();
            $code = 200;
        }else if(self::matchUri($uri, "/favourites/{animalId}/{userId}", $parameters)){
            $entities = FavouritesRepository::getIfFavouriteExists($parameters['animalId'], $parameters['userId']);
            $code = 200;
        }else if(self::matchUri($uri, "/tokens/{token}", $parameters)){
            $entities = TokenRepository::getOne($parameters['token']);
            $code = 200;
        }else if (self::matchUri($uri, "/alluser/{email}", $parameters)){
            $entities = UserRepository::getAll();
            $entities = array_merge($entities, AdminRepository::getAll());
            $entities = array_merge($entities, EmployeeRepository::getAll());
        
            $code = 200;
        }

        if($code == 404){
            Response::response([], 404, "$uri not found");
        }else{
            $entities = $entities ?? []; // If $entities is null, set it to an empty array
            if (!is_array($entities)) $entities = [$entities]; // Convert non-array data into an array
            Response::response($entities, $code);
        }
    }

    private static function getRequestData(): ?array {
        return json_decode(file_get_contents("php://input"),true);
    }

    private static function matchUri($uri, $pattern, &$parameters){
        $ok = false;
        if(str_contains($uri, "?"))$uri = substr($uri, 0, strpos($uri, "?"));
        $uriSegments = explode("/", trim($uri, "\0\t\n\x0B\r \\/")) ?? null;
        $patternSegments = explode("/", trim($pattern, "\0\t\n\x0B\r \\/")) ?? null;

        $i = 0;
        $ok = true;
        if(count($uriSegments) == count($patternSegments)){
            while ($i < count($uriSegments) && $i < count($patternSegments)) {
                $uriSegment = $uriSegments[$i];
                $patternSegment = $patternSegments[$i];
                if($patternSegment[0] == '{' && $patternSegment[strlen($patternSegment) - 1] == '}'){
                    if($ok){
                        $paramName = substr($patternSegment, 1, strlen($patternSegment)-2);
                        $paramValue = $uriSegment;
                        $parameters[$paramName] = $paramValue;
                    }
                }else{
                    $ok = $ok && $uriSegment == $patternSegment;
                }
                $i++;
            }
        }
        else $ok = false;

        return $ok;
    }

    private static function getArguments($uri){
        $args = []; 
        if(str_contains($uri, "?")){
            $uri = substr($uri, strpos($uri, "?")+1, 120000);
            $argSegments = explode("&", trim($uri, "\0\t\n\x0B\r \\/")) ?? null;
            for($i = 0; $i < count($argSegments); $i++){
                $argHalves = explode("=", $argSegments[$i]);
                if(count($argHalves) == 2){
                    $args[$argHalves[0]] = $argHalves[1];
                }
            }
        }
        return $args;
    } 
}