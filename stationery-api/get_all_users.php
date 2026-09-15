<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }
$conn = new mysqli("localhost", "root", "", "stationery_db");

$sql = "SELECT user_id, full_name, username, email, role FROM Users WHERE role != 'Admin' ORDER BY user_id DESC";
$result = $conn->query($sql);
$users = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(["status" => "success", "data" => $users]);
} else {
    echo json_encode(["status" => "empty", "message" => "No users found."]);
}
$conn->close();
?>