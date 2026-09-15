<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') { exit(0); }

$conn = new mysqli("localhost", "root", "", "stationery_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed!"]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id) && isset($data->product_id)) {
    $user_id = $data->user_id;
    $product_id = $data->product_id;

    $check_sql = "SELECT * FROM Cart WHERE user_id = $user_id AND product_id = $product_id";
    $result = $conn->query($check_sql);

    if ($result->num_rows > 0) {
        $update_sql = "UPDATE Cart SET quantity = quantity + 1 WHERE user_id = $user_id AND product_id = $product_id";
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Quantity updated in cart!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to update quantity."]);
        }
    } else {
        $insert_sql = "INSERT INTO cart (user_id, product_id, quantity) VALUES ($user_id, $product_id, 1)";
        if ($conn->query($insert_sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Product added to cart!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to add to cart."]);
        }
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid Data! user_id and product_id required."]);
}

$conn->close();
?>