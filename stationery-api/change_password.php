<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

$conn = new mysqli("localhost", "root", "", "stationery_db");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id) && isset($data->old_password) && isset($data->new_password)) {
    $user_id = $data->user_id;
    $old_password = $conn->real_escape_string($data->old_password);
    $new_password = $conn->real_escape_string($data->new_password);
    $check_sql = "SELECT * FROM Users WHERE user_id = $user_id AND password = '$old_password'";
    $result = $conn->query($check_sql);

    if ($result && $result->num_rows > 0) {
        $update_sql = "UPDATE Users SET password = '$new_password' WHERE user_id = $user_id";
        
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Password updated successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect old password!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data provided."]);
}

$conn->close();
?>