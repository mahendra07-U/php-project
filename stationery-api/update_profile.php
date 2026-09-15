<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Database Connection
$conn = new mysqli("localhost", "root", "", "stationery_db");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed!"]));
}

$data = json_decode(file_get_contents("php://input"));

// चेक करें कि यूज़र की ID और नाम भेजा गया है या नहीं
if (isset($data->user_id) && isset($data->full_name)) {
    
    $user_id = $data->user_id;
    $full_name = $data->full_name;
    $roll_no = isset($data->roll_no_emp_id) ? $data->roll_no_emp_id : '';
    $phone = isset($data->phone_number) ? $data->phone_number : '';
    $update_sql = "UPDATE users SET full_name = ?, roll_no_emp_id = ?, phone_number = ? WHERE user_id = ?";
    $stmt = $conn->prepare($update_sql);
    $stmt->bind_param("sssi", $full_name, $roll_no, $phone, $user_id);

    if ($stmt->execute()) {

        $fetch_sql = "SELECT user_id, username, email, full_name, role, roll_no_emp_id, phone_number, account_status, joined_date, profile_img FROM users WHERE user_id = $user_id";
        $result = $conn->query($fetch_sql);
        $updated_user = $result->fetch_assoc();

        echo json_encode(["status" => "success", "message" => "Profile updated successfully!", "user" => $updated_user]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to update profile!"]);
    }
    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Required data missing!"]);
}

$conn->close();
?>