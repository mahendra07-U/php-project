<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }
$conn = new mysqli("localhost", "root", "", "stationery_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed!"]));
}

$sql = "SELECT order_id, customer_name, city, total_amount, order_status, order_date 
        FROM orders 
        ORDER BY order_date DESC, order_id DESC";
        
$result = $conn->query($sql);
$orders = [];

if ($result) {
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $orders]);
    } else {
        echo json_encode(["status" => "empty", "message" => "No orders found in the database."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
}

$conn->close();
?>