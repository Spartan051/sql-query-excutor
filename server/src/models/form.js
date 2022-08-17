const sql = require("./db");
const mysql = require("mysql");
function Forms() {}

Forms.getall = (req, result) => {
  sql.query(
    "SELECT id , form_name  FROM forms WHERE user_id = (SELECT id FROM users WHERE token = ?) ",
    [req.headers.token],
    (err, response) => {
      if (err) {
        console.log("error :", err);
        result(err, null);
      } else {
        console.log("forms has been send");
        result(null, response);
      }
    }
  );
};

Forms.getOne = (req, result) => {
  const query1 =
    "SELECT form_name FROM forms WHERE id = ? AND user_id = (SELECT id FROM users WHERE token = ?)";
  const query3 =
    "SELECT * FROM queries WHERE id in ((SELECT query_id FROM side_form WHERE form_id = ?)) AND user_id = (SELECT id FROM users WHERE token = ?)";

  let queryIds = [];

  sql.query(query1, [req.params.id, req.headers.token], (err, response) => {
    if (err) {
      console.log("eror : ", err);
      result(err, null);
    } else {
      sql.query(
        query3,
        [req.params.id, req.headers.token],
        (err, response2) => {
          if (err) {
            console.log("eror : ", err);
            result(err, null);
          } else {
            response[0].queries = response2;
            result(null, response);
          }
        }
      );
    }
  });
};

Forms.create = (req, result) => {
  const newForm = req.body;

  sql.query(
    "INSERT INTO forms(user_id , form_name) VALUES((SELECT id FROM users WHERE token = ?),?)",
    [req.headers.token, newForm.form_name],
    (err) => {
      if (err) {
        console.log("error :", err);
        result(err, null);
      } else {
        console.log("form is created");
        result(null);
        const queryNamesArray = newForm.query_names.split(",");

        queryNamesArray.map((item) => {
          sql.query(
            "INSERT INTO side_form(form_id , query_id)  VALUES((SELECT id FROM forms WHERE form_name = ?), (SELECT id FROM queries WHERE query_name = ?))",
            [newForm.form_name, item],
            (err) => {
              if (err) {
                console.log("error :", err);
                result(err, null);
              } else {
                console.log("side_form is created");
              }
            }
          );
        });
      }
    }
  );
};

Forms.execute = (req, result) => {
  const excQuery = req.body;
  excQuery.name = "'" + excQuery.name + "'";

  sql.query(
    "SELECT * FROM queries WHERE query_name = ? AND user_id = (SELECT id FROM users WHERE token = ?)",
    [excQuery.name, req.headers.token],
    (err, response) => {
      if (err) {
        console.log("error :", err);
      } else {
        const data = response[0];
        let query = data.query;

        for (let index = 1; index > 0; ) {
          const str = "input" + index;

          if (data.query.includes(str)) {
            query = query.replace(str, excQuery[index - 1]);
            index++;
          } else {
            index = -index;
          }
        }

        sql.query(
          "SELECT host , username , password , database_name FROM queries JOIN connections USING (connection_name)",
          (err, response) => {
            if (err) {
              console.log("error:" + err);
            } else {
              const newDB = response[0];
              const db = mysql.createConnection({
                host: newDB.host,
                user: newDB.username,
                password: newDB.password,
                database: newDB.database_name,
              });

              db.query(query, (err, response) => {
                if (err) {
                  console.log("error:" + err);
                  result(err, null);
                } else {
                  result(null, response);
                }
              });
            }
          }
        );
      }
    }
  );
};

module.exports = Forms;
