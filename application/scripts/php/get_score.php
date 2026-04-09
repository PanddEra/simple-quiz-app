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

$stmt = $conn->prepare("
    SELECT ur.question_id, ur.selected_option, q.correct_option
    FROM user_responses ur
    JOIN questions q ON ur.question_id = q.question_id
    WHERE ur.username = ?
");

$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

$score = 0;
$total = 0;

while ($row = $result->fetch_assoc()) {
    $total++;
    if ($row['selected_option'] === $row['correct_option']) {
        $score++;
    }
}

$stmt->close();

echo json_encode([
    "score" => $score,
    "total" => $total
]);

mysqli_close($conn);