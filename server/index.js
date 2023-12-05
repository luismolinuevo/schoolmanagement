const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db  = require("./dbconfig")

const app = express();

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

//Get Department by id
app.get("/dept/:id", (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM Department WHERE id = ${id}`;

  db.query(query, (err, results) => {
    if(err) {
      console.err("Error executing query", err);
      res.status(500).send("Error getting data");
      return;
    }

    if(results.length === 0) {
      res.status(404).send("Data not found");
      return;
    }

    res.json(results);
  });
});

//Create Department
app.post("/dept", (req, res) => {
  const { DeptId, DeptName, Phone, Location } = req.body;
  const query = `INSERT INTO Department (DeptId, DeptName, Phone, Location) VAlUES (?, ?)`;

  db.query(query, [DeptId, DeptName, Phone, Location], (err, results) => {
    if(err) {
      console.err("Error executing query", err);
      res.status(500).send("Error getting data");
      return;
    }

    res.status(201).json({
      success: true,
      results
    });
  });
});

//Start the express server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
