const sql = require("./db");
function Queries() {}

Queries.getAll = (result) => {
  sql.query("SELECT * FROM queries", (err, response) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
    } else {
      console.log("queries has been send");
      result(null, response);
    }
  });
};

Queries.getOne = (newId, result) => {
  sql.query(
    `SELECT * FROM queries WHERE query_id = ${newId}`,
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        console.log(`query ${newId} has been send`);
        result(null, response);
      }
    }
  );
};

Queries.create = (newQuery, result) => {
  const dataArray = [
    newQuery.connection_name,
    newQuery.connection_name,
    newQuery.query_name,
    newQuery.query,
    newQuery.fields,
    newQuery.show_type,
  ];

  sql.query(
    "INSERT INTO queries SET connection_id=(SELECT connection_id FROM connections WHERE connection_name = ?),connection_name=?,query_name=?,query=?,fields=?,show_type=?",
    dataArray,
    (err) => {
      if (err) {
        console.log("error :", err);
        result(err, null);
      } else {
        console.log("query is created");
        result(null, "query is created");
      }
    }
  );
};

Queries.delete = (newId, result) => {
  sql.query(`DELETE FROM queries WHERE query_id = ${newId}`, (err) => {
    if (err) {
      console.log("error :" + err);
      result(err);
    } else {
      console.log(`query ${newId} is deleted`);
      result(null);
    }
  });
};

Queries.update = (newData, result) => {
  const dataArray = [
    newData.connection_name,
    newData.connection_name,
    newData.query_name,
    newData.query,
    newData.fields,
    newData.show_type,
    newData.query_id,
  ];

  sql.query(
    "UPDATE queries SET connection_id=(SELECT connection_id FROM connections WHERE connection_name = ?),connection_name=?,query_name=?,query=?,fields=?,show_type=? WHERE query_id=?",
    dataArray,
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`query ${newData.query_id} is updated`);
        result(null);
      }
    }
  );
};

module.exports = Queries;
