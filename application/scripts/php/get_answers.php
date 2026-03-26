<?php
header('Content-Type: application/json');
require_once 'connect_db.php';

$query = "SELECT * FROM answers";
$result = mysqli_query($conn, $query);

if (!$result) {
    echo json_encode(["error" => mysqli_error($conn)]);
    exit;
}

$answers = [];
while($row = mysqli_fetch_assoc($result)) {
    $answers[] = $row;
}

echo json_encode($answers);