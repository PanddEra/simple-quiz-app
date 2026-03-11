<?php
global $conn;
$query = "SELECT * FROM answers";

$result = mysqli_query($conn, $query);
$questions = [];

while($row = mysqli_fetch_assoc($result)) {
    $questions[] = $row;
}

echo json_encode($questions);