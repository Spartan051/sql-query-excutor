const mysql = require("mysql");
const data = require("../config/dataDB");

const connection = mysql.createConnection({
  host: data.host,
  user: data.user,
  password: data.password,
  database: data.database,
});

module.exports = connection

