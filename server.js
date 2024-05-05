const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");


const bcrypt = require("bcrypt");
const server = express();
const jwt = require("jsonwebtoken");

server.use(bodyParser.json());



// Configure middleware
server.use(cors());
server.use(bodyParser.json());

// Establish MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "User@2026",
  database: "library",
});

db.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  } else {
    console.log("Successfully connected to MySQL database.");
  }
});

// Server setup
server.listen(8085, (error) => {
  if (error) {
    console.error("Error starting server:", error);
  } else {
    console.log("Server started on port 8085");
  }
});

// Add a new team member
server.post("/api/team/add", (req, res) => {
  const { first, last, age, education, experience, designation } = req.body;

  const newTeamMember = {
    first,
    last,
    age,
    education,
    experience,
    designation,
  };

  const sql = "INSERT INTO teams SET ?";

  db.query(sql, newTeamMember, (error, result) => {
    if (error) {
      console.error("Error creating team member:", error);
      res.status(500).send({ status: false, message: "Failed to add team member" });
    } else {
      res.status(201).send({
        status: true,
        message: "Team member added successfully",
        data: result.insertId,
      });
    }
  });
});

// Retrieve all team members
server.get("/api/team", (req, res) => {
  const sql = "SELECT * FROM teams";

  db.query(sql, (error, result) => {
    if (error) {
      console.error("Error fetching teams:", error);
      res.status(500).send({ status: false, message: "Failed to retrieve teams" });
    } else {
      res.status(200).send({ status: true, data: result });
    }
  });
});

// Retrieve a specific team member by ID
server.get("/api/team/search/:id", (req, res) => {
  const teamId = req.params.id;

  const sql = "SELECT * FROM teams WHERE id = ?";
  db.query(sql, [teamId], (error, result) => {
    if (error) {
      console.error("Error searching for team member:", error);
      res.status(500).send({ status: false, message: "Search failed" });
    } else if (result.length === 0) {
      res.status(404).send({ status: false, message: "No team member found" });
    } else {
      res.status(200).send({ status: true, data: result });
    }
  });
});

// Update a team member
server.put("/api/team/update/:id", (req, res) => {
  const teamId = req.params.id;
  const { first, last, age, education, experience, designation } = req.body;

  const updateQuery = "UPDATE teams SET first = ?, last = ?, age = ?, education = ?, experience = ?, designation = ? WHERE id = ?";

  db.query(updateQuery, [first, last, age, education, experience, designation, teamId], (error, result) => {
    if (error) {
      console.error("Error updating team member:", error);
      res.status(500).send({ status: false, message: "Update failed" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ status: false, message: "Team member not found" });
    } else {
      res.status(200).send({ status: true, message: "Team member updated successfully" });
    }
  });
});

// Delete a team member
server.delete("/api/team/delete/:id", (req, res) => {
  const teamId = req.params.id;

  const deleteQuery = "DELETE FROM teams WHERE id = ?";
  
  db.query(deleteQuery, [teamId], (error, result) => {
    if (error) {
      console.error("Error deleting team member:", error);
      res.status(500).send({ status: false, message: "Deletion failed" });
    } else if (result.affectedRows === 0) {
      res.status(404).send({ status: false, message: "Team member not found" });
    } else {
      res.status(200).send({ status: true, message: "Team member deleted successfully" });
    }
  });
});



// Secret for JWT
const jwtSecret = ""; // Use a secure secret

// User registration
server.post("/api/register", (req, res) => {
    const { fullName, email, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";
    db.query(sql, [fullName, email, hashedPassword], (error, result) => {
        if (error) {
            console.error("Registration error:", error);
            res.status(500).send({ status: false, message: "Account creation failed" });
        } else {
            res.status(201).send({ status: true, message: "Account created successfully" });
        }
    });
});

// User login
server.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error("Login error:", error);
            res.status(500).send({ status: false, message: "Login failed" });
        } else if (results.length === 0) {
            res.status(401).send({ status: false, message: "Invalid credentials" });
        } else {
            const user = results[0];
            const passwordMatch = bcrypt.compareSync(password, user.password);

            if (passwordMatch) {
                // Generate a JWT token
                const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, { expiresIn: "1h" });
                res.status(200).send({ status: true, message: "Login successful", token: token });
            } else {
                res.status(401).send({ status: false, message: "Invalid credentials" });
            }
        }
    });
});

// Server setup
