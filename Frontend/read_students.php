<?php
include 'db_connection.php';
$result = $conn->query("SELECT * FROM student");
if ($result->num_rows > 0) {
while ($row = $result->fetch_assoc()) {
echo "Name: " . $row['name'] . " - PRN NO: " . $row['prn'] . " - Phone: " .
$row['phone'] . " - email: " . $row['email'] . "<br>";
}
} else {
echo "0 results";
}
$conn->close();
?>