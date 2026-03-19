<?php
global $conn;
$conn = mysqli_connect("localhost:3307", "root", "", "quiz");

if (!$conn) {
    die("Error: " . mysqli_connect_error());
}