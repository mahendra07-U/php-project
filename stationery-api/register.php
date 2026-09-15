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

if (isset($data->full_name) && isset($data->email) && isset($data->username) && isset($data->password)) {
    
    $full_name = $data->full_name;
    $email = $data->email;
    $user_name = $data->username;
    $pass = $data->password;
    $joined_date = date("Y-m-d"); 
    $default_role = 'Student'; 

    $check_sql = "SELECT * FROM Users WHERE email = ? OR username = ?";
    $stmt_check = $conn->prepare($check_sql);
    $stmt_check->bind_param("ss", $email, $user_name);
    $stmt_check->execute();
    $result = $stmt_check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Username or Email already exists!"]);
    } else {
        $insert_sql = "INSERT INTO Users (username, email, password, full_name, role, joined_date) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt_insert = $conn->prepare($insert_sql);
        $stmt_insert->bind_param("ssssss", $user_name, $email, $pass, $full_name, $default_role, $joined_date);
        
        if ($stmt_insert->execute()) {
            echo json_encode(["status" => "success", "message" => "Account created successfully! Please Login."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create account!"]);
        }
        $stmt_insert->close();
    }
    $stmt_check->close();
} else {
    echo json_encode(["status" => "error", "message" => "Please fill all required fields!"]);
}

$conn->close();
?>