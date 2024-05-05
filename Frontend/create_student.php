<?php
include 'db_connection.php';
$name = $_POST['name'];
$prn = $_POST['prn'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$sql = "INSERT INTO student (name, prn, phone, email) VALUES ('$name', '$prn','$phone', '$email')";
if ($conn->query($sql) === TRUE) {
echo "Student added successfully";
} else {
echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>