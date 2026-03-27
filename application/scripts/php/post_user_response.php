<?php
header('Content-Type: application/json');
require_once 'connect_db.php';

$json = file_get_contents('php://input');
$requestData = json_decode($json, true);

if (!$requestData) {
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit;
}

$username = $requestData['username'] ?? 'Guest';
$responses = $requestData['responses'] ?? [];

$total = count($responses);

if ($total > 0) {
    $stmt = $conn->prepare("INSERT INTO user_responses (username, question_id, selected_option) VALUES (?, ?, ?)");

    foreach ($responses as $resp) {
        $q_id = (int)$resp['question_id'];
        $opt = $resp['selected_option'];

        $stmt->bind_param("sis", $username, $q_id, $opt);
        $stmt->execute();
    }

    $stmt->close();
}

mysqli_close($conn);