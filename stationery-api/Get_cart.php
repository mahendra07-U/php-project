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
    $sql = "SELECT c.cart_id, c.quantity, p.product_id, p.product_name, p.price, p.product_image_url 
            FROM Cart c 
            JOIN products p ON c.product_id = p.product_id 
            WHERE c.user_id = $user_id";
            
    $result = $conn->query($sql);
    $cart_items = [];

    if ($result && $result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $cart_items[] = $row;
        }
        echo json_encode(["status" => "success", "data" => $cart_items]);
    } else {
        echo json_encode(["status" => "empty", "message" => "Your cart is empty!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User ID missing!"]);
}
$conn->close();
?>