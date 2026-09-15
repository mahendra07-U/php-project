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

if (isset($data->user_id) && isset($data->total_amount)) {
    $user_id = $data->user_id;
    $total_amount = $data->total_amount;
    
    // फॉर्म का डेटा 
    $name = $conn->real_escape_string($data->name);
    $phone = $conn->real_escape_string($data->phone);
    $address = $conn->real_escape_string($data->address);
    $city = $conn->real_escape_string($data->city);
    $pincode = $conn->real_escape_string($data->pincode);
    $order_date = date('Y-m-d'); 
    $order_sql = "INSERT INTO orders (user_id, customer_name, phone_number, delivery_address, city, pincode, total_amount, payment_method, order_status, order_date) 
                  VALUES ($user_id, '$name', '$phone', '$address', '$city', '$pincode', $total_amount, 'Cash on Delivery', 'Pending', '$order_date')";

    if ($conn->query($order_sql) === TRUE) {
        $order_id = $conn->insert_id; 
        $cart_items_sql = "SELECT c.product_id, quantity, p.price 
                           FROM cart c 
                           JOIN products p ON c.product_id = p.product_id 
                           WHERE c.user_id = $user_id";
        
        $result = $conn->query($cart_items_sql);
        
        if ($result && $result->num_rows > 0) {
            while ($item = $result->fetch_assoc()) {
                $p_id = $item['product_id'];
                $qty = $item['quantity'];
                $price = $item['price'];
                
                $insert_item_sql = "INSERT INTO order_items (order_id, product_id, quantity, price_at_order_time) 
                                    VALUES ($order_id, $p_id, $qty, $price)";
                $conn->query($insert_item_sql);
            }
            $clear_cart_sql = "DELETE FROM cart WHERE user_id = $user_id";
            $conn->query($clear_cart_sql);

            echo json_encode(["status" => "success", "message" => "Order placed successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Your cart is empty!"]);
        }
    } else {
         echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Incomplete data provided."]);
}

$conn->close();
?>