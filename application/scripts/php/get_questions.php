<?php
header('Content-Type: application/json');
require_once 'connect_db.php';

$query = "SELECT question_id, question_text FROM questions";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$questions = [];
while($row = mysqli_fetch_assoc($result)) {
    $questions[] = $row;
}

echo json_encode($questions);