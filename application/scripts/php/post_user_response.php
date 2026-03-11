<?php
global $conn;
$username = $_GET['username'] || bin2hex(random_bytes(8));
$q_id = $_GET['q_id'];
$option = $_GET['option'];

$query = "INSERT INTO user_responses (username, question_id, selected_option) VALUES ('$username', $q_id, '$option')";

mysqli_query($conn, $query);

mysqli_close($conn);