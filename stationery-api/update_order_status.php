<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

$conn = new mysqli("localhost", "root", "", "stationery_db");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->order_id) && isset($data->new_status)) {
    $order_id = $data->order_id;
    $new_status = $conn->real_escape_string($data->new_status);

    $sql = "UPDATE orders SET order_status = '$new_status' WHERE order_id = $order_id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["status" => "success", "message" => "Status updated to $new_status"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data provided."]);
}

$conn->close();
?>