const db = require("../../config/db");
const bcrypt = require("bcrypt");
const { createTokens } = require("../utils/JWT");

const login = async (username, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM superadmin WHERE username = ?",
      [username],
      async (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          const user = result[0];
          const dbPassword = user.password;
          bcrypt.compare(password, dbPassword).then((match) => {
            if (!match) {
              reject("Wrong combination of username and password");
            } else {
              const accessToken = createTokens({
                username: user.username,
                id: user.id,
              });
              resolve({ user, accessToken });
            }
          });
        } else {
          reject("User not found");
        }
      }
    );
  });
};

module.exports = { login };
