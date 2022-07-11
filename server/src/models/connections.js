const sql = require("./db");
function Connections() {}

Connections.getAll = (userId, result) => {
  sql.query(
    "SELECT * FROM connections WHERE user_id = ?",
    [userId],
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

Connections.getOne = (connection_id, result) => {
  sql.query(
    "SELECT * FROM connections WHERE id = ?",
    [connection_id],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        console.log(`connection ${connection_id} has been send`);
        result(null, response);
      }
    }
  );
};

Connections.create = (newConnection, result) => {
  sql.query(
    "SELECT connection_name FROM connections WHERE user_id = ?",
    [newConnection.user_id],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        const newArray = response.filter(
          (item) => item.connection_name == newConnection.connection_name
        );

        if (newArray.length) {
          result(err, {
            message: `connection name is already exist`,
          });
        } else {
          sql.query("INSERT INTO connections SET ?", newConnection, (err) => {
            if (err) {
              console.log("eror : ", err);
              result(err, null);
            } else {
              console.log(
                `connection ${newConnection.connection_name} is created`
              );
              result(null, {
                message: "connection is created",
              });
            }
          });
        }
      }
    }
  );
};

Connections.delete = (userId, result) => {
  sql.query(`DELETE FROM connections WHERE id = ?`, userId, (err) => {
    if (err) {
      console.log("error :" + err);
      result(err);
    } else {
      console.log(`connection ${userId} is deleted`);
      result(null, {
        message: "connection is deleted",
      });
    }
  });
};

Connections.update = (newUserData, result) => {
  const newUser = [
    newUserData.connection_name,
    newUserData.host,
    newUserData.database_name,
    newUserData.username,
    newUserData.password,
    newUserData.connection_id,
  ];

  sql.query(
    "UPDATE connections SET connection_name =?,host=?,database_name=?,username=?,password=? WHERE id=?",
    newUser,
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`connection ${newUserData.connection_id} is updated`);
        result(null, {
          message: "connection is deleted",
        });
      }
    }
  );
};

module.exports = Connections;
