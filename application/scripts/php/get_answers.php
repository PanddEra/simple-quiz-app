<?php
require_once 'connect_db.php';

$query = "SELECT * FROM answers";

$result = mysqli_query($conn, $query);
$answers = [];

while($row = mysqli_fetch_assoc($result)) {
    $answers[] = $row;
}

echo json_encode($answers);