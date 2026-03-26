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

$score = 0;
$total = count($responses);

if ($total > 0) {
    $stmt = $conn->prepare("INSERT INTO user_responses (username, question_id, selected_option) VALUES (?, ?, ?)");
    $check_stmt = $conn->prepare("SELECT correct_option FROM questions WHERE question_id = ?");

    foreach ($responses as $resp) {
        $q_id = (int)$resp['question_id'];
        $opt = $resp['selected_option'];

        // Calculate score
        $check_stmt->bind_param("i", $q_id);
        $check_stmt->execute();
        $res = $check_stmt->get_result();
        if ($row = $res->fetch_assoc()) {
            if ($row['correct_option'] === $opt) $score++;
        }

        // Save response
        $stmt->bind_param("sis", $username, $q_id, $opt);
        $stmt->execute();
    }
    $stmt->close();
    $check_stmt->close();
}

echo json_encode([
    "status" => "ok",
    "score" => $score,
    "total" => $total
]);

mysqli_close($conn);