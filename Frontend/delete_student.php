<?php
include 'db_connection.php';
$id = $_POST['id'];
$sql = "DELETE FROM student WHERE prn=$id";
if ($conn->query($sql) === TRUE) {
echo "Student deleted successfully";
} else {
echo $conn->error;
}
$conn->close();
?>