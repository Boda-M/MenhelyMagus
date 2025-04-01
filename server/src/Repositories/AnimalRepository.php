<?php

namespace App\Repositories;

use App\Authentication\Authenticate;

class AnimalRepository extends BaseRepository
{
    protected static string $tableName = 'animals';

    public static function getOne($id){
        $query = "SELECT animals.id, animals.shelterId, animals.name, animals.gender, animals.birthDate, FLOOR(GetAge(animals.birthDate)) AS `age`, animals.entryDate, animals.speciesId, animals.neutered, animals.healthy, animals.weight, animals.cuteness, animals.childFriendlyness, animals.sociability, animals.exerciseNeed, animals.furLength, animals.docility, animals.housebroken, animals.description FROM `" . static::$tableName . "` WHERE id = $id";
        $entity = self::$mysqli->query($query)->fetch_assoc();
        $entity['breed'] = BreedJunctionRepository::getBreedsForAnimalId($id);
        $entity['habitat'] = HabitatJunctionRepository::getHabitatsForAnimalId($id);
        $entity['vaccine'] = VaccineJunctionRepository::getVaccinesForAnimalId($id);
        $entity['img'] = self::loadImageAsBase64('img/' . $entity['id'] . '.jpg');
        return $entity;
    }

    public static function getAll():array{
        $query = self::select();
        $entities = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);
        foreach ($entities as &$entity) {
            $entity['breed'] = BreedJunctionRepository::getBreedsForAnimalId($entity['id']);
            $entity['habitat'] = HabitatJunctionRepository::getHabitatsForAnimalId($entity['id']);
            $entity['vaccine'] = VaccineJunctionRepository::getVaccinesForAnimalId($entity['id']);
        }
        return $entities;
    }

    public static function getMaxId(){
        $query = "SELECT MAX(id) FROM animals;";
        return (int) self::$mysqli->query($query)->fetch_assoc()['MAX(id)'];
    }
    
    public static function update(int $id, array $data)
    {
        $animal = self::getOne($id);
        $authSuccess = Authenticate::Auth($data, "employee", $animal['shelterId']);

        if ($authSuccess == true) {
            unset($data['token']);

            if (isset($data['image'])) {
                self::saveBase64ImgToDisk($data['image'], $id);
                unset($data['image']);
            }

            if (isset($data['breedId'])) {
                BreedJunctionRepository::updateBreedsForAnimalId($id, $data['breedId']);
                unset($data['breedId']);
            }

            if (isset($data['habitatId'])) {
                HabitatJunctionRepository::updateHabitatsForAnimalId($id, $data['habitatId']);
                unset($data['habitatId']);
            }

            if (isset($data['vaccineId'])) {
                VaccineJunctionRepository::updateVaccinesForAnimalId($id, $data['vaccineId']);
                unset($data['vaccineId']);
            }

            return parent::update($id, $data);
        }
        return ["Unauthorized"];   
    }

    public static function create(array $data): ?array
    {
        $authSuccess = Authenticate::Auth($data, "employee", $data['shelterId']);

        if ($authSuccess == true)
        {
            if(isset($data['shelterId']) && isset($data['birthDate']) && isset($data['entryDate']) && isset($data['speciesId']) && isset($data['name']) && isset($data['gender']) && isset($data['neutered']) && isset($data['healthy']) && isset($data['weight']) && isset($data['cuteness']) && isset($data['childFriendlyness']) && isset($data['sociability']) && isset($data['exerciseNeed']) && isset($data['furLength']) && isset($data['docility']) && isset($data['housebroken']) && isset($data['description']) ){
            
                unset($data['token']);

                $image = null;
                if(isset($data['image'])){
                    $image = $data['image'];
                    unset($data['image']);
                }

                $breedIds = null;
                if(isset($data['breedId'])){
                    $breedIds = $data['breedId'];
                    unset($data['breedId']);
                }
    
                $habitatIds = null;
                if(isset($data['habitatId'])){
                    $habitatIds = $data['habitatId'];
                    unset($data['habitatId']);
                }
    
                $vaccineIds = null;
                if(isset($data['vaccineId'])){
                    $vaccineIds = $data['vaccineId'];
                    unset($data['vaccineId']);
                }

                $new = parent::create($data);

                if(isset($image)){
                    $id = self::getLatestId();
                    self::saveBase64ImgToDisk($image, $id);
                }
    
                if($breedIds && count($breedIds)>0){
                    BreedJunctionRepository::updateBreedsForAnimalId($new['id'], $breedIds);
                    $new['breedId'] = BreedJunctionRepository::getBreedsForAnimalId($new['id']);
                }
                
                if($habitatIds && count($habitatIds)>0){
                    HabitatJunctionRepository::updateHabitatsForAnimalId($new['id'], $habitatIds);
                    $new['habitatId'] = HabitatJunctionRepository::getHabitatsForAnimalId($new['id']);
                }
                
                if($vaccineIds && count($vaccineIds)>0){
                    VaccineJunctionRepository::updateVaccinesForAnimalId($new['id'], $vaccineIds);
                    $new['vaccineId'] = VaccineJunctionRepository::getVaccinesForAnimalId($new['id']);
                }
    
                return $new;
            }
            return [];
        }
        return ["Unauthorized"];   
    }

    public static function saveBase64ImgToDisk($base64img, $id){
        $base64part = substr($base64img, strpos($base64img, ",") + 1);
        $data = base64_decode($base64part);

        $path = "img/$id.jpg";
        file_put_contents($path, $data);
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

    public static function loadImageWithOverlays($imagePath, $data, $preferences) {
        if (!file_exists($imagePath)) {
            $imagePath = "img/noImage.png"; // Fallback image
        }

        $traits = array("docility", "furLength", "exerciseNeed", "sociability", "childFriendlyness", "cuteness", "weight", "age");
    
        
        
        // Try different formats
        $image = @imagecreatefromjpeg($imagePath) ?: 
        @imagecreatefrompng($imagePath)  ?: 
        @imagecreatefromgif($imagePath)  ?: 
            @imagecreatefromwebp($imagePath) ?: 
            @imagecreatefrombmp($imagePath);
            
            if (!$image) {
                return false; // Could not load the image
            }
            
            
        // Allocate colors
        $traitColors = array(
            "docility"         => imagecolorallocate($image, 173, 216, 230), // Light Blue
            "furLength"        => imagecolorallocate($image, 184, 134, 11),  // Golden Brown
            "exerciseNeed"     => imagecolorallocate($image, 255, 0, 0),     // Bright Red
            "sociability"      => imagecolorallocate($image, 255, 165, 0),   // Orange
            "childFriendlyness"=> imagecolorallocate($image, 255, 223, 88),  // Soft Yellow
            "cuteness"         => imagecolorallocate($image, 255, 105, 180), // Pink
            "weight"           => imagecolorallocate($image, 112, 128, 144), // Steel Gray
            "age"              => imagecolorallocate($image, 75, 0, 130)     // Deep Purple
        );
        $red = imagecolorallocate($image, 255, 0, 0);
        $black = imagecolorallocate($image, 0, 0, 0);

        $displayScale = imagesx($image) / 400;
    
        //Draw stats
        for($i = 0; $i < 8; $i++){
            $y = 350 - $i*40;
            $trait = $traits[$i];
            $rectangleWidth = 90;

            imagerectangle($image, 25 * $displayScale, $y * $displayScale, (25 + $rectangleWidth) * $displayScale, ($y + 35) * $displayScale, $traitColors[$trait]);
            imagefilledrectangle($image, 25 * $displayScale, $y * $displayScale, (25 + ($rectangleWidth * $data[$trait] / 10)) * $displayScale, ($y + 35) * $displayScale, $traitColors[$trait]);

            imageline($image, (25 + ($rectangleWidth * $preferences[$trait] / 10)) * $displayScale, ($y) * $displayScale, (25 + ($rectangleWidth * $preferences[$trait] / 10)) * $displayScale, ($y + 40) * $displayScale, $black);

            imagestring($image, 5 * $displayScale * $displayScale, 30 * $displayScale, $y * $displayScale, $traits[$i], $black);
        }

        //Draw score
        $x = 300 * $displayScale;
        $y = 30 * $displayScale;
        $w = 35 * $displayScale;
        $h = 350 * $displayScale;
        $maxScore = 0;
        for($i = 0; $i < 8; $i++){
            $maxScore += ($preferences[$traits[$i]."Weight"] / 10);
            //error_log($traits[$i]." - ".$preferences[$traits[$i]."Weight"]);
        }
        imagerectangle($image, $x, $y, $x + $w, $y + $h, $black);
        $totalScore = 0;
        for($i = 0; $i < 8; $i++){
            $trait = $traits[$i];
            $rectangleWidth = 90;

            $score = $data[$trait . 'Score'] / 10;

            $scoreHeightPx = $h/$maxScore*$score;
            $totalScoreHeightPx = $h/$maxScore*$totalScore;

            imagefilledrectangle($image, $x, $y + ($h - $totalScoreHeightPx), $x + $w, $y + ($h - ($totalScoreHeightPx + $scoreHeightPx)), $traitColors[$trait]);
            $totalScore += $score;
        }
    
        // Convert the modified image to base64
        ob_start();
        imagejpeg($image); // Always save as JPEG
        $imageData = ob_get_contents();
        ob_end_clean();
    
        imagedestroy($image); // Free memory
    
        return 'data:image/jpeg;base64,' . base64_encode($imageData);
    }

    public static function deleteWhereShelter($shelterId)
    {
        // Deleting all the photos of the animals that are going to be deleted later
        $query = "SELECT id FROM `" . static::$tableName . "` WHERE shelterId = $shelterId;";
        $ids = self::$mysqli->query($query)->fetch_all(MYSQLI_ASSOC);

        foreach ($ids as $animalId) {
            $files = glob('img/*.*'); // Get all files in the img folder
            foreach ($files as $file) {
                $filename = pathinfo($file, PATHINFO_FILENAME); // Extract filename without extension
                if ($filename == $animalId['id']) unlink($file); // If filename equals to animal ID -> delete it
            }
        }

        // Deleting all the animals that are from the shelter with the Id "$shelterId"
        $query = "DELETE FROM `" . static::$tableName . "` WHERE shelterId = $shelterId;";
        self::$mysqli->query($query);
    }

    public static function modifySpeciesWhere($speciesId)
    {
        $query = "UPDATE `" . static::$tableName . "` SET speciesId = -1 WHERE speciesId = $speciesId;";
        self::$mysqli->query($query);
    }

    public static function deleteOne($data, $requiredAccountType) : string
    {
        $authSuccess = Authenticate::Auth($data, $requiredAccountType, AnimalRepository::getOne($data['id'])['shelterId']);

        if ($authSuccess == true)
        {
            $id = (int) $data['id'];

            $files = glob('img/*.*'); // Get all files in the img folder
            foreach ($files as $file) {
                $filename = pathinfo($file, PATHINFO_FILENAME); // Extract filename without extension
                if ($filename == $id) unlink($file); // If filename equals to animal ID -> delete it
            }

            BreedJunctionRepository::deleteBreedsForAnimalId($id);

            HabitatJunctionRepository::deleteHabitatsForAnimalId($id);

            VaccineJunctionRepository::deleteVaccinesForAnimalId($id);

            $query = "DELETE FROM `" . static::$tableName . "` WHERE id = $id;";
            $result = self::$mysqli->query($query);

            if ($result) 
            {
                if (self::$mysqli->affected_rows > 0) return "true";
            }

            return "false";
        }
        return "Unauthorized";   
    }

    public static function processFilters($requestFilters)
    {
        if (isset($requestFilters['filters']) && is_array($requestFilters['filters'])) $filters = $requestFilters['filters'];
        else $filters = $requestFilters;
        return $filters;
    }

    public static function paginator($parameters, $data = NULL, &$meta = NULL)
    {
        $howManyToShow = isset($parameters['howMany'])?$parameters['howMany']:12;
        $pageToShow = isset($parameters['page'])?$parameters['page']:1;
        $filters = isset($data['filters']) ? $data['filters'] : null;
        $preferences = isset($data['preferences']) ? $data['preferences'] : null;

        //Fetch userdata
        $userType = null;
        $userId = null;
        if(isset($data['token'])){$parameters['token']=$data['token'];}
        if(isset($parameters['token'])){
            $user = TokenRepository::getOne($parameters['token']);
            if(isset($user['userType'])) $userType = $user['userType'];
            if(isset($user['userId'])) $userId = $user['userId'];
        }else{
            $userType = "user";
        }

        $scoring = "";
        $debug = "";
        if($preferences != NULL){
            if(isset($preferences['age']) && isset($preferences['ageWeight']))$scoring .= "+ evaluateProperty(GetAge(animals.birthDate) / 3, {$preferences['age']} / 3, {$preferences['ageWeight']}) ";//TODO <-
            if(isset($preferences['weight']) && isset($preferences['weightWeight']))$scoring .= "+ evaluateProperty(LinearizeWeight(weight), LinearizeWeight({$preferences['weight']}), {$preferences['weightWeight']}) ";
            if(isset($preferences['cuteness']) && isset($preferences['cutenessWeight']))$scoring .= "+ evaluateProperty(cuteness, {$preferences['cuteness']}, {$preferences['cutenessWeight']}) ";
            if(isset($preferences['childFriendlyness']) && isset($preferences['childFriendlynessWeight']))$scoring .= "+ evaluateProperty(childFriendlyness, {$preferences['childFriendlyness']}, {$preferences['childFriendlynessWeight']}) ";
            if(isset($preferences['sociability']) && isset($preferences['sociabilityWeight']))$scoring .= "+ evaluateProperty(sociability, {$preferences['sociability']}, {$preferences['sociabilityWeight']}) ";
            if(isset($preferences['exerciseNeed']) && isset($preferences['exerciseNeedWeight']))$scoring .= "+ evaluateProperty(exerciseNeed, {$preferences['exerciseNeed']}, {$preferences['exerciseNeedWeight']}) ";
            if(isset($preferences['furLength']) && isset($preferences['furLengthWeight']))$scoring .= "+ evaluateProperty(furLength, {$preferences['furLength']}, {$preferences['furLengthWeight']}) ";
            if(isset($preferences['docility']) && isset($preferences['docilityWeight']))$scoring .= "+ evaluateProperty(docility, {$preferences['docility']}, {$preferences['docilityWeight']}) ";

            //FONTOS DEBUG KÓD - NE TÖRÖLD KI

            if(isset($preferences['age']) && isset($preferences['ageWeight']))$debug .= ", evaluateProperty(GetAge(animals.birthDate) / 3, {$preferences['age']} / 3, {$preferences['ageWeight']}) AS `ageScore` ";//TODO <-
            if(isset($preferences['weight']) && isset($preferences['weightWeight']))$debug .= ", evaluateProperty(LinearizeWeight(weight), LinearizeWeight({$preferences['weight']}), {$preferences['weightWeight']}) AS `weightScore` ";
            if(isset($preferences['cuteness']) && isset($preferences['cutenessWeight']))$debug .= ", evaluateProperty(cuteness, {$preferences['cuteness']}, {$preferences['cutenessWeight']}) AS `cutenessScore` ";
            if(isset($preferences['childFriendlyness']) && isset($preferences['childFriendlynessWeight']))$debug .= ", evaluateProperty(childFriendlyness, {$preferences['childFriendlyness']}, {$preferences['childFriendlynessWeight']}) AS `childFriendlynessScore` ";
            if(isset($preferences['sociability']) && isset($preferences['sociabilityWeight']))$debug .= ", evaluateProperty(sociability, {$preferences['sociability']}, {$preferences['sociabilityWeight']}) AS `sociabilityScore`";
            if(isset($preferences['exerciseNeed']) && isset($preferences['exerciseNeedWeight']))$debug .= ", evaluateProperty(exerciseNeed, {$preferences['exerciseNeed']}, {$preferences['exerciseNeedWeight']}) AS `exerciseNeedScore`";
            if(isset($preferences['furLength']) && isset($preferences['furLengthWeight']))$debug .= ", evaluateProperty(furLength, {$preferences['furLength']}, {$preferences['furLengthWeight']}) AS `furLengthScore`";
            if(isset($preferences['docility']) && isset($preferences['docilityWeight']))$debug .= ", evaluateProperty(docility, {$preferences['docility']}, {$preferences['docilityWeight']}) AS `docilityScore`";//*/
        }
        $filter = self::compileFilter($filters, $userType, $userId);


        $query  = "SELECT animals.id, animals.shelterId, animals.name, animals.gender, animals.birthDate, FLOOR(GetAge(animals.birthDate)) AS `age`, animals.entryDate, animals.speciesId, animals.neutered, animals.healthy, animals.weight, animals.cuteness, animals.childFriendlyness, animals.sociability, animals.exerciseNeed, animals.furLength, animals.docility, animals.housebroken, animals.description$debug, (0 $scoring)AS `score`, shelters.city AS `shelter`, species.name AS `species` ";
        $query .= ", GROUP_CONCAT(breeds.id ORDER BY breeds.id SEPARATOR ',') AS `breedIds`";
        $query .= ", GROUP_CONCAT(breeds.name ORDER BY breeds.id SEPARATOR ',') AS `breedNames`";
        if($userType == "user" && $userId != null){
            $query .= ", CASE WHEN favourites.animalId IS NOT NULL THEN 1 ELSE 0 END AS `favourite`";
        }
        $query .= " FROM `" . static::$tableName . "` ";
        if($userType == "user" && $userId != null){
            $query .= "LEFT JOIN favourites ON animals.id = favourites.animalId AND favourites.userId = $userId ";
        }
        $query .= "INNER JOIN shelters ON animals.shelterId = shelters.id ";
        $query .= "LEFT JOIN adoptions ON animals.id = adoptions.animalId ";
        $query .= "INNER JOIN breedjunction ON breedjunction.animalId = animals.id ";
        $query .= " INNER JOIN breeds ON breeds.id = breedjunction.breedId ";
        $query .= " INNER JOIN species ON species.id = animals.speciesId ";
        if(strlen($filter))$query .= "WHERE $filter ";
        $query .= "GROUP BY animals.id ";
        $query .= "ORDER BY score DESC ";
        $recordsToSkip = ($pageToShow - 1) * $howManyToShow;
        $query .= "LIMIT $recordsToSkip, $howManyToShow";
        //return ["filters" => $filters, "preferences" => $preferences, "query" => $query];
        $result = self::$mysqli->query($query);
        $result = $result == false?[]:$result->fetch_all(MYSQLI_ASSOC);

        $totalAnimalCount = self::getFilteredCount($parameters, $data);
        $meta['totalAnimalCount'] = $totalAnimalCount;
        $meta['currentPage'] = $pageToShow;
        $meta['animalsPerPage'] = $howManyToShow;
        $meta['pageCount'] = ceil($totalAnimalCount / $howManyToShow);
        $meta['query'] = $query;

        for($i = 0; $i < count($result); $i++){
            $result[$i]['img'] = self::loadImageAsBase64('img/' . $result[$i]['id'] . '.jpg');
            //Uncomment for detailed scoring debug
            //if($preferences != NULL)$result[$i]['img'] = self::loadImageWithOverlays('img/' . $result[$i]['id'] . '.jpg', $result[$i], $preferences);

            //Unpack multi-value fields
            $result[$i]['breeds'] = explode(',', $result[$i]['breedIds']);
            unset($result[$i]['breedIds']);
            $result[$i]['breedNames'] = explode(',', $result[$i]['breedNames']);
        }

        $meta['debug'] = var_export($result,true);
        return $result;
    }

    public static function getFilteredCount($parameters, $data)
    {
        $filters = isset($data['filters']) ? $data['filters'] : null;

        //Fetch userdata
        $userType = null;
        $userId = null;
        if(isset($parameters['token'])){
            $user = TokenRepository::getOne($parameters['token']);
            if(isset($user['userType'])) $userType = $user['userType'];
            if(isset($user['userId'])) $userId = $user['userId'];
        }
        else $userType = "user";

        $filter = self::compileFilter($filters, $userType, $userId);


        $query  = "SELECT COUNT(animals.id) AS count ";
        $query .= "FROM `" . static::$tableName . "` ";
        $query .= "LEFT JOIN adoptions ON animals.id = adoptions.animalId ";
        if(strlen($filter))$query .= "WHERE $filter ";
        $result = self::$mysqli->query($query);
        $result = $result == false?0:$result->fetch_all(MYSQLI_ASSOC)[0]['count'];
        return $result;
    }

    public static function compileFilter($filters, $userType, $userId){
        $filter = "";
        if($filters != null){
            if(isset($filters['gender']))$filter .= " AND animals.gender = \"{$filters['gender']}\"";
            if(isset($filters['neutered']))$filter .= (" AND animals.neutered = " . (strcmp($filters['neutered'], 'Yes')?0:1)); 
            if(isset($filters['housebroken']))$filter .= (" AND animals.housebroken = " . (strcmp($filters['housebroken'], 'Yes')?0:1));
            if(isset($filters['favourite']) && $filters['favourite'] == '1' && isset($userId))$filter .= " AND animals.id IN (SELECT animalId FROM favourites WHERE userId = $userId)"; 
            if(isset($filters['species']))$filter .= (" AND animals.speciesId = " . $filters['species']);
            if(isset($filters['shelters'])){
                $shelterStr = "(";
                foreach($filters['shelters'] as $shelterId){
                    $shelterStr .= $shelterId.", ";
                }
                $shelterStr = substr($shelterStr, 0, strlen($shelterStr)-2) . ")";
                $filter .= (" AND animals.shelterId IN" . $shelterStr);
            }
            if(isset($filters['name']))$filter .= (" AND animals.name LIKE '%" . $filters['name'] . "%'");
            if(isset($filters['breeds'])){
                $breedStr = "(";
                foreach($filters['breeds'] as $breedId){
                    $breedStr .= $breedId.", ";
                }
                $breedStr = substr($breedStr, 0, strlen($breedStr)-2) . ")";
                $filter .= (" AND animals.id IN (SELECT animalId FROM `breedjunction` WHERE breedId IN " . $breedStr . " GROUP BY animalId)");
            }
            if(isset($filters['habitats'])){
                $habitatStr = "(";
                foreach($filters['habitats'] as $habitatId){
                    $habitatStr .= $habitatId.", ";
                }
                $habitatStr = substr($habitatStr, 0, strlen($habitatStr)-2) . ")";
                $filter .= (" AND animals.id IN (SELECT animalId FROM `habitatjunction` WHERE habitatId IN " . $habitatStr . " GROUP BY animalId)");
            }
        }
        //Hide adopted animals
        if($userType == "employee" || $userType == "admin")$filter .= " AND (adoptions.pending = 1 OR adoptions.pending IS NULL)";
        else $filter .= " AND adoptions.pending IS NULL";

        //Hide sick animals
        if(!($userType == "employee" || $userType == "admin"))$filter .= " AND animals.healthy = 1";

        $filter = ltrim($filter, " AND ");
        return $filter;
    }
}