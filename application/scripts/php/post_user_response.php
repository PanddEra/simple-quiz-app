<?php
require_once 'connect_db.php';

$username = $_GET['username'] ?? bin2hex(random_bytes(8));
$q_id = $_GET['q_id'];
$option = $_GET['option'];

$stmt = $conn->prepare("INSERT INTO user_responses (username, question_id, selected_option) VALUES (?, ?, ?)");
$stmt->bind_param("sis", $username, $q_id, $option);
$stmt->execute();
$stmt->close();
mysqli_close($conn);
?>