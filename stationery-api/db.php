<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
$host = "localhost";
$username ="root";
$password ="";
$database = "stationery_db";
$conn = new mysqli($host, $username, $password, $database);
if($conn->connect_error){
    echo json_encode(["status" => "success", "message" => "connection failed:".$conn->connect_error]);
}else{
    echo json_encode(["status" =>"success", "message" =>"React aur PHP Database successfully connect ho gya!"]);
} 
?>