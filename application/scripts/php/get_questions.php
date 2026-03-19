<?php
require_once 'connect_db.php';

$query = "SELECT question_id, question_text FROM questions";
$result = mysqli_query($conn, $query);
$questions = [];

while($row = mysqli_fetch_assoc($result)) {
    $questions[] = $row;
}

echo json_encode($questions);