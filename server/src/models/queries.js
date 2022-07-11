const sql = require("./db");
function Queries() {}

Queries.getAll = (userId,result) => {
  sql.query("SELECT * FROM queries WHERE user_id = ? ",
  [userId],
  (err, response) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
    } else {
      console.log("queries has been send");
      result(null, response);
    }
  });
};

Queries.getOne = (queryId, result) => {
  sql.query(
    "SELECT * FROM queries WHERE id = ?",
    [queryId],
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
    newQuery.user_id,
    newQuery.connection_name,
    newQuery.query_name,
    newQuery.query,
    newQuery.fields,
    newQuery.show_type,
  ];

  sql.query(
    "SELECT query_name FROM queries WHERE user_id = ?",
    [newQuery.user_id],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        const newArray = response.filter(
          (item) => item.query_name == newQuery.query_name
        );

        if (newArray.length) {
          result(err, {
            message: "query name is already exist",
          });
        } else {
          sql.query(
            "INSERT INTO queries SET connection_id=(SELECT id FROM connections WHERE connection_name = ?),user_id=?,connection_name=?,query_name=?,query=?,fields=?,show_type=?",
            dataArray,
            (err) => {
              if (err) {
                console.log("error :", err);
                result(err, null);
              } else {
                console.log(`query ${newQuery.query_name} is created`);
                result(null, "query is created");

                const fieldsArray = newQuery.fields.split(",")
                fieldsArray.map((item) => {
                  sql.query(
                    "INSERT INTO fields SET query_id = LAST_INSERT_ID(),field=?",
                    [item],
                    (err) => {
                      if (err) {
                        console.log("error :", err);
                        result(err, null);
                      } else {
                        console.log(`field ${item} is created`);
                      }
                    }
                  );
                });
              }
            }
          );
        }
      }
    }
  );
};

Queries.delete = (newId, result) => {
  sql.query(`DELETE FROM queries WHERE id = ${newId}`, (err) => {
    if (err) {
      console.log("error :" + err);
      result(err);
    } else {
      console.log(`query ${newId} is deleted`);
      result(null, {
        message: "query is deleted",
      });
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
    "UPDATE queries SET connection_id=(SELECT id FROM connections WHERE connection_name = ?),connection_name=?,query_name=?,query=?,fields=?,show_type=? WHERE id=?",
    dataArray,
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`query ${newData.query_id} is deleted`);
        result(null, {
          message: "query is deleted",
        });
      }
    }
  );
};

module.exports = Queries;
