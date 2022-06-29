const sql = require("./db");
function Connections() {}

Connections.getAll = (result) => {
  sql.query("SELECT * FROM connections", (err, response) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
    } else {
      console.log("connections has been send");
      result(null, response);
    }
  });
};

Connections.getOne = (newId, result) => {
  sql.query(
    `SELECT * FROM connections WHERE connection_id = ${newId}`,
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        console.log(`connection ${newId} has been send`);
        result(null, response);
      }
    }
  );
};

Connections.create = (newData, result) => {
  sql.query("INSERT INTO connections SET ?", newData, (err) => {
    if (err) {
      console.log("eror : ", err);
      result(err, null);
    } else {
      console.log("connection is created");
      result(null);
    }
  });
};

Connections.delete = (newId, result) => {
  sql.query(`DELETE FROM connections WHERE connection_id = ${newId}`, (err) => {
    if (err) {
      console.log("error :" + err);
      result(err);
    } else {
      console.log(`connection ${newId} is deleted`);
      result(null);
    }
  });
};

Connections.update = (newData, result) => {
  const dataArray =[newData.connection_name,newData.host,newData.database_name,newData.username,newData.password,newData.connection_id]
  
  sql.query("UPDATE connections SET connection_name =?,host=?,database_name=?,username=?,password=? WHERE connection_id=?",dataArray, (err) => {
    if (err) {
      console.log("error :" + err);
      result(err);
    } else {
      console.log(`connection ${newData.connection_id} is updated`);
      result(null);
    }
  });
};

module.exports = Connections;
