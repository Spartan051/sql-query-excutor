const sql = require("./db");
const bcryptService = require("../services/bycrypt.service");
const authService = require("../services/auth.service");

function User() {}

User.getOne = (userData, result) => {
  let { email, password } = userData;

  if (!email && !password) {
    result({ message: "email or password is empty" });
  } else {
    sql.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (err, response) => {
        if (err) {
          console.log(`error : ${err}`);
        } else {
          if (!response.length) {
            result({ message: "this user not exist" });
          } else {
            if (
              !bcryptService().comparePassword(password, response[0].password)
            ) {
              result({ message: "password is wrong" });
            } else {
              const token = authService().issue({ id: response.id });

              sql.query(
                "UPDATE users SET token = ? WHERE email = ?",
                [token, email],
                (err) => {
                  if (err) {
                    result(err, null);
                    console.log(`error : ${err}`);
                  } else {
                    console.log("token saved");
                    result(null, {
                      message: "user info has been send",
                      user: response,
                      token: token,
                    });
                  }
                }
              );
            }
          }
        }
      }
    );
  }
};

User.create = (newUser, result) => {
  if (newUser.password !== newUser.coPassword) {
    result({ message: "Passwords must be the same" });
  } else {
    newUser.password = bcryptService().password(newUser);

    sql.query(
      "INSERT INTO users(firstname,lastname,email,password) VALUES(?,?,?,?)",
      [newUser.firstname, newUser.lastname, newUser.email, newUser.password],
      (err) => {
        if (err) {
          console.log("eror : ", err);
          result(err, null);
        } else {
          console.log(`user ${newUser.firstname} is created`);
          result(null, {
            message: "user is created",
          });
        }
      }
    );
  }
};

module.exports = User;
