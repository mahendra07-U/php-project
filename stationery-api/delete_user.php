<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }
$conn = new mysqli("localhost", "root", "", "stationery_db");
$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id)) {
    $user_id = $data->user_id;
    $sql = "DELETE FROM Users WHERE user_id = $user_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "User deleted successfully!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to delete user."]);
    }
}
$conn->close();
?>