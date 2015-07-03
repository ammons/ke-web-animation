<?
$conn = new mysqli(SERVER, USER, PASSWORD, DATABASE);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
?>