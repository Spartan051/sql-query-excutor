const sql = require("./db");
function Connection() {}

Connection.getAll = (token, result) => {
  sql.query(
    "SELECT * FROM connections WHERE user_id = (SELECT id FROM users WHERE token = ?)",
    [token],
    (err, response) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
      } else {
        console.log("connections has been send");
        result(null, response);
      }
    }
  );
};

Connection.getOne = (req, result) => {
  sql.query(
    "SELECT * FROM connections WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [req.params.id, req.headers.token],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        console.log(`connection ${req.params.id} has been send`);
        result(null, response);
      }
    }
  );
};

Connection.create = (req, result) => {
  let newConnection = req.body;
  sql.query(
    "SELECT * FROM connections WHERE connection_name = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [newConnection.connection_name, req.headers.token],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        if (response.length) {
          result(err, {
            message: `connection name is already exist`,
          });
        } else {
          newConnection = [
            req.headers.token,
            newConnection.connection_name,
            newConnection.host,
            newConnection.database_name,
            newConnection.username,
            newConnection.password,
          ];
          sql.query(
            "INSERT INTO connections(user_id,connection_name,host,database_name,username,password) VALUES((SELECT id FROM users WHERE token = ?),?,?,?,?,?)",
            newConnection,
            (err) => {
              if (err) {
                console.log("eror : ", err);
                result(err, null);
              } else {
                console.log(`connection ${newConnection[1]} is created`);
                result(null, {
                  message: "connection is created",
                });
              }
            }
          );
        }
      }
    }
  );
};

Connection.delete = (req, result) => {
  sql.query(
    "DELETE FROM connections WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [req.params.id, req.headers.token],
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`connection ${req.params.id} is deleted`);

        result(null, {
          message: "connection is deleted",
        });
      }
    }
  );
};

Connection.update = (req, result) => {
  const connection = req.body;
  const newConnection = [
    connection.connection_name,
    connection.host,
    connection.database_name,
    connection.username,
    connection.password,
    connection.connection_id,
    req.headers.token,
  ];

  sql.query(
    "UPDATE connections SET connection_name =?,host=?,database_name=?,username=?,password=? WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    newConnection,
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`connection ${connection.connection_id} is updated`);
        result(null, {
          message: "connection is updated ",
        });
      }
    }
  );
};

module.exports = Connection;
