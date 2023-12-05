const dotenv = require("dotenv");
const express = require("express");
const mysql = require("mysql");
dotenv.config();

const app = express();
app.use(express.json());

//Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

//Start the express server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
