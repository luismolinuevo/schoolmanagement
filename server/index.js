const dotenv = require("dotenv");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("./dbconfig");

const app = express();

//Middlewares
app.use(express.json());
// const corsOptions = {
//   origin: "http://127.0.0.1:5500", 
// };

app.use(cors({origin: "*"})); // Enable CORS preflight requests for all routes
app.use(morgan("tiny"));

// Select route for all departments
app.get("/dept", (req, res) => {
  const sql = "SELECT * FROM Department";
  db.query(sql, (err, result) => {
    if (err) {
      console.log("Error executing query", err);
      res.status(500).json({
        success: false,
        message: "There has been a error geting the data",
      });
      return;
    }

    res.status(200).json({ success: true, result });
  });
});

//Select Department by id
app.get("/dept/:id", (req, res) => {
  const DeptId = req.params.id;
  const query = `SELECT * FROM Department WHERE DeptId=${DeptId}`;

  db.query(query, (err, results) => {
    if (err) {
      console.log("Error executing query", err);
      res.status(500).json({ success: false, message: "Error getting data" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ success: false, message: "Data not found" });
      return;
    }

    res.status(200).json(results);
  });
});

//Update Department by id
app.put("/dept/:id", (req, res) => {
  const id = req.params.id;
  const { DeptName, Phone, Location } = req.body;
  const query = `UPDATE Department SET DeptName=?, Phone=?, Location=? WHERE DeptId=?`;

  db.query(query, [DeptName, Phone, Location, id], (err, results) => {
    if (err) {
      console.log("Error executing query", err);
      res.status(500).json({ success: false, message: "Error getting data" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ success: false, message: "Data not found" });
      return;
    }

    res.status(200).json(results);
  });
});

//Create Department
app.post("/dept", (req, res) => {
  console.log(req.body)
  const { DeptId, DeptName, Phone, Location } = req.body;
  console.log(req.body)
  const query = `INSERT INTO Department (DeptId, DeptName, Phone, Location) VAlUES (?, ?, ?, ?)`;

  db.query(query, [DeptId, DeptName, Phone, Location], (err, results) => {
    if (err) {
      console.log("Error executing query", err);
      res.status(500).json({ success: false, message: "Error getting data" });
      return;
    }

    res.status(201).json({
      success: true,
      results,
    });
  });
});

//Start the express server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
