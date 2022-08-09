const sql = require("./db");
const mysql = require("mysql");
function Forms() {}

Forms.getall = (req, result) => {
  sql.query(
    "SELECT form_name , queries FROM forms WHERE user_id = (SELECT id FROM users WHERE token = ?) ",
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

Forms.create = (req, result) => {
  const newForm = req.body;

  newForm.queries = JSON.stringify(response);

  sql.query("INSERT INTO forms SET ?", [newForm.form_name], (err) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
    } else {
      console.log("form is created");
      const queryNamesArray = newForm.query_names.split(",");

      queryNamesArray.map((item) => {
        sql.query(
          `INSERT INTO side_form SET form_id = LAST_INSERT_ID(),query_id=(SELECT id FROM queries WHERE query_name = ?) `,
          [item],
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
  });
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
          const str = "field" + index;

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
