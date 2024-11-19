const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_diary_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL database");
});
//middeleWare
app.use("", (req, res, next) => {
  console.log(`Request Type : ${req.method}-----  Request Url :${req.path}`);
  next();
});
// Routes
// GET all entries
app.get("/entries", (req, res) => {
  db.query("SELECT * FROM entries", (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// POST a new entry
app.post("/entries", (req, res) => {
  const { title, content } = req.body;

  db.query(
    "INSERT INTO entries (title, content) VALUES (?, ?)",
    [title, content],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Entry added");
    }
  );
});

// PUT (update) an entry
app.put("/entries/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  db.query(
    "UPDATE entries SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        throw err;
      }
      res.send("Entry updated");
    }
  );
});
// PUT (update) an entry
app.put("/entries/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  db.query(
    "UPDATE entries SET title = ?, content = ? WHERE id = ?",
    [title, content, id],
    (err, result) => {
      if (err) {
        console.error("Error updating entry:", err);
        res.status(500).json({ error: "Error updating entry" });
      } else {
        res.status(200).json({ message: "Entry updated successfully" });
      }
    }
  );
});

// DELETE an entry
app.delete("/entries/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM entries WHERE id = ?", id, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Entry deleted");
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
