<?php
session_start();
include './vendor/autoload.php';
// Allow requests from all origins (or restrict to specific origins)
header("Access-Control-Allow-Origin: *"); // or specify your frontend origin: 'http://localhost:10000'

// Allow methods
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Allow headers
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    
use App\Html\Request;
use App\Repositories\BaseRepository;

BaseRepository::initDB();
Request::handle();
?>