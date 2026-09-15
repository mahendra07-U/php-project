<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "stationery_db";  
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed!"]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->identifier) && isset($data->password)) {
    
    $identifier = $data->identifier; 
    $password = $data->password;
    $sql = "SELECT user_id, username, email, full_name, role, roll_no_emp_id, phone_number, account_status, joined_date, profile_img 
            FROM Users 
            WHERE (email = ? OR username = ?) AND password = ?";
            
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $identifier, $identifier, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        if ($user['account_status'] === 'Inactive') {
            echo json_encode(["status" => "error", "message" => "Your account is inactive. Please contact Admin."]);
        } else {
            echo json_encode([
                "status" => "success",
                "message" => "Welcome back, " . $user['full_name'] . "!",
                "user" => $user 
            ]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid Username/Email or Password!"]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Please fill all the required fields!"]);
}

$conn->close();
?>