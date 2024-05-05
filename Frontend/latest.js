$(document).ready(function() {
    // Load initial student list on page load
    loadStudents();
    // Function to load students from the server
    function loadStudents() {
    $.ajax({
    url: 'read_students.php',
    method: 'GET',
    success: function(data) {
    $('#studentList').html(data);
    }
    
    });
    }
    // Function to create a new student
    window.createStudent = function() {
    var formData = $('#createForm').serialize();
    $.ajax({
    url: 'create_student.php',
    method: 'POST',
    data: formData,
    success: function() {
    loadStudents(); // Reload the student list after creating
    }
    });
    };
    // Function to update an existing student
    window.updateStudent = function() {
    var formData = $('#updateForm').serialize();
    $.ajax({
    url: 'update_student.php',
    method: 'POST',
    data: formData,
    success: function() {
    loadStudents(); // Reload the student list after updating
    }
    });
    };
    // Function to delete an existing student
    window.deleteStudent = function() {
    var formData = $('#deleteForm').serialize();
    $.ajax({
    url: 'delete_student.php',
    method: 'POST',
    data: formData,
    success: function() {
    loadStudents(); // Reload the student list after deleting
    }
    });
    };
    });