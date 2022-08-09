const sql = require("./db");
function Query() {}

Query.getAll = (req, result) => {
  sql.query(
    "SELECT * FROM queries WHERE user_id = (SELECT id FROM users WHERE token = ?) ",
    [req.headers.token],
    (err, response) => {
      if (err) {
        console.log("error :", err);
        result(err, null);
      } else {
        console.log("queries has been send");
        result(null, response);
      }
    }
  );
};

Query.getOne = (req, result) => {
  sql.query(
    "SELECT * FROM queries WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [req.params.id, req.headers.token],
    (err, response) => {
      if (err) {
        console.log("eror : ", err);
        result(err, null);
      } else {
        console.log(`query ${req.params.id} has been send`);
        result(null, response);
      }
    }
  );
};

Query.create = (req, result) => {
  const newQuery = req.body;
  const dataArray = [
    newQuery.connection_name,
    req.headers.token,
    newQuery.query_name,
    newQuery.query,
    newQuery.fields,
  ];

  sql.query(
    "SELECT query_name FROM queries WHERE user_id = (SELECT id FROM users WHERE token = ?)",
    [req.headers.token],
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
            "INSERT INTO queries SET connection_id=(SELECT id FROM connections WHERE connection_name = ?),user_id= (SELECT id FROM users WHERE token = ?),query_name=?,query=?,fields=?",
            dataArray,
            (err) => {
              if (err) {
                console.log("error :", err);
                result(err, null);
              } else {
                console.log(`query ${newQuery.query_name} is created`);
                result(null, "query is created");

                const fieldsArray = newQuery.fields.split(",");
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

Query.update = (req, result) => {
  const query = req.body;
  const newQuery = [
    query.connection_name,
    query.query_name,
    query.query,
    query.fields,
    query.query_id,
    req.headers.token,
  ];

  sql.query(
    "UPDATE queries SET connection_name=?,query_name=?,query=?,fields=? WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    newQuery,
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`query ${query.query_id} is updated`);
        result(null, {
          message: "query is updated",
        });
      }
    }
  );
};

Query.delete = (req, result) => {
  sql.query(
    "DELETE FROM queries WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [req.params.id, req.headers.token],
    (err) => {
      if (err) {
        console.log("error :" + err);
        result(err);
      } else {
        console.log(`query ${req.params.id} is deleted`);
        result(null, {
          message: "query is deleted",
        });
      }
    }
  );
};

module.exports = Query;
