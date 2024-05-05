<?php
include 'db_connection.php';


$id = $_POST['phone'];
$name = $_POST['name'];
$prn = $_POST['prn'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$sql = "UPDATE student SET name='$name', prn='$prn', phone='$phone',
email='$email' WHERE prn=$id";
if ($conn->query($sql) === TRUE) {
echo "Student updated successfully";
} else {
echo "Error updating student: " . $conn->error;
}
$conn->close();
?>