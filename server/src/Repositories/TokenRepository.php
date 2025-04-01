<?php

namespace App\Repositories;

class TokenRepository extends BaseRepository
{
    protected static string $tableName = 'tokens';

    public static function create(array $data): ?array
    {
        if(isset($data['userId']) && isset($data['userType']) && isset($data['token'])) return parent::create($data);
        return [];
    }

    public static function getOne($token)
    {
        $query = self::select() . "WHERE token = '$token'";
        return self::$mysqli->query($query)->fetch_assoc();
    }
}