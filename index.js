// server.js
const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = Express();
app.use(cors());
app.use(bodyParser.json());

const CONNECTION_STRING = "mongodb+srv://yuvraj:yuvraj@cluster0.hevejyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASE_NAME = "library";
let database;

MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.error("Error connecting to MongoDB:", error);
    } else {
        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connection Successful");
    }
});

app.listen(5038, () => {
    console.log("Server is running on port 5038");
});

// CRUD operations for books

// Get all books
app.get("/api/library/books", (req, res) => {
    database.collection("books").find({}).toArray((error, result) => {
        if (error) {
            console.error("Error fetching books from MongoDB:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

// Get a single book by ID
app.get("/api/library/books/:id", (req, res) => {
    const bookId = new require("mongodb").ObjectId(req.params.id);
    database.collection("books").findOne({ _id: bookId }, (error, result) => {
        if (error) {
            console.error("Error fetching book:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

// Add a new book
app.post("/api/library/books", (req, res) => {
    const newBook = req.body;
    database.collection("books").insertOne(newBook, (error, result) => {
        if (error) {
            console.error("Error adding book:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result.ops[0]);
        }
    });
});

// Update an existing book
app.put("/api/library/books/:id", (req, res) => {
    const bookId = new require("mongodb").ObjectId(req.params.id);
    const updatedBook = req.body;
    database.collection("books").updateOne(
        { _id: bookId },
        { $set: updatedBook },
        (error, result) => {
            if (error) {
                console.error("Error updating book:", error);
                res.status(500).send("Internal Server Error");
            } else {
                res.send("Book updated successfully");
            }
        }
    );
});

// Delete a book
app.delete("/api/library/books/:id", (req, res) => {
    const bookId = new require("mongodb").ObjectId(req.params.id);
    database.collection("books").deleteOne({ _id: bookId }, (error, result) => {
        if (error) {
            console.error("Error deleting book:", error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Book deleted successfully");
        }
    });
});

