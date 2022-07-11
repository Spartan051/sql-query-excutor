const sql = require("./db");
const mysql = require("mysql");
function Forms() {}

Forms.getall = (result) => {
  sql.query("SELECT form_name , queries FROM forms", (err, response) => {
    if (err) {
      console.log("error :", err);
      result(err, null);
    } else {
      console.log("forms has been send");
      result(null, response);
    }
  });
};

Forms.create = (newForms, result) => {
  const queryNamesArray = newForms.query_names.split(",");
  const queryNames = [];

  for (let item of queryNamesArray) {
    const newItem = "'" + item + "'";
    queryNames.push(newItem);
  }

  const strQueryNames = queryNames.toString();

  sql.query(
    `SELECT query_name , fields FROM queries WHERE query_name IN (${strQueryNames})`,
    (err, response) => {
      if (err) {
        console.log("error :", err);
      } else {
  
        newForms.queries = JSON.stringify(response);

        sql.query("INSERT INTO forms SET ?", newForms, (err) => {
          if (err) {
            console.log("error :", err);
            result(err, null);
          } else {
            console.log("form is created");
            const queryNamesArray = newForms.query_names.split(",");

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
      }
    }
  );
};

Forms.execute = (newData, result) => {
  newData.name = "'" + newData.name + "'";

  sql.query(
    `SELECT * FROM queries WHERE query_name = ${newData.name}`,
    (err, response) => {
      if (err) {
        console.log("error :", err);
      } else {
        const data = response[0];
        let query = data.query;

        for (let index = 1; index > 0; ) {
          const str = "field" + index;

          if (data.query.includes(str)) {
            query = query.replace(str, newData[index - 1]);
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
