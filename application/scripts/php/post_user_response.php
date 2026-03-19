<?php
require_once 'connect_db.php';

// Отримуємо JSON
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Перевіряємо сесію або шлемо нікнейм з фронта (зараз візьмемо з сесії для прикладу)
session_start();
$username = $_SESSION['username'] ?? 'Guest_' . rand(1000, 9999);

if ($data) {
    $stmt = $conn->prepare("INSERT INTO user_responses (username, question_id, selected_option) VALUES (?, ?, ?)");

    foreach ($data as $resp) {
        $q_id = (int)$resp['question_id'];
        $opt = $resp['selected_option']; // Це буде рядком 'option_a', 'option_b' і т.д.

        $stmt->bind_param("sis", $username, $q_id, $opt);
        $stmt->execute();
    }
    $stmt->close();
    echo json_encode(["status" => "ok"]);
}
mysqli_close($conn);