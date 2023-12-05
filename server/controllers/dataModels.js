const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

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

module.exports = {
    getCourse: (callback) => {
        const query = "SELECT * FROM Course";
        connection.query(query, callback);
    },
    // addCourse: (data, callback) => {
    //     const query = "INSERT INTO Course"
    // },
    deleteCourse: (id, callback) => {
        const query = `DELETE FROM Course WHERE id = ${id}`;
        connection.query(query, callback);
    },
    updateCourse: (id, callback) => {
        const query = `UPDATE Course SET`
    }
}