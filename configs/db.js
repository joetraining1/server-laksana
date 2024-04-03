const { Sequelize } = require("sequelize");
const mysql = require("mysql2/promise");

const database = "mock1";

// defining database
const db = new Sequelize(database, "root", "", {
  dialect: "mysql",
  host: "localhost",
});

const init = async () => {
  //connection to database
  console.log("connecting to database..");
  const arise = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
  });

  try {
    //create database if not exists
    await arise.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

    //synchronize database
    db.sync({
      alter: true,
    })
      .then((res) => {
        console.log("Database Connected.");
      })
      .catch((err) => console.log("Error occured : ", err));
  } catch (error) {
    console.log("error occured", +error);
  }
};

const connect = async () => {
  try {
    await db.authenticate();
    console.log("Database Connection Success.");
  } catch (error) {
    console.log("Database Connection Error", error);
  }
};

const abort = () => {
  db.close();
};

exports.init = init;
exports.connect = connect;
exports.abort = abort;
exports.db = db;
