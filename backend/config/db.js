const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
});

const conn = () => {
  try {
    db.connect();
    db.query("CREATE DATABASE IF NOT EXISTS CYBERNAUTS", (error, results) => {
      if (error) throw error;
      return results;
    });
    db.query("USE CYBERNAUTS", (error, results) => {
      if (error) throw error;
      return results;
    });
    db.query(
      "CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY AUTO_INCREMENT,firstName VARCHAR(30) NOT NULL,lastName VARCHAR(30) NOT NULL,userName VARCHAR(30) NOT NULL,email VARCHAR(30) NOT NULL UNIQUE,password VARCHAR(70) NOT NULL)",
      (error, results) => {
        if (error) throw error;
        return results;
      }
    );
    console.log("DB Connected!");
    return db;
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit();
  }
};

module.exports = conn;
