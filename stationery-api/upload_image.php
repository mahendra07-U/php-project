<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");

$conn = new mysqli("localhost", "root", "", "stationery_db");
if (isset($_FILES['image']) && isset($_POST['user_id'])) {
    $userId = $_POST['user_id'];

    $imageName = time() . "_" . basename($_FILES["image"]["name"]); 
    $targetPath = "uploads/" . $imageName;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {

        $conn->query("UPDATE users SET profile_img = '$targetPath' WHERE user_id = $userId");
        echo json_encode(["status" => "success", "image_path" => $targetPath]);
        
    } else {
        echo json_encode(["status" => "error", "message" => "Image upload failed!"]);
    }
}
?>