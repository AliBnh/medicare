const bcrypt = require("bcrypt");
const getConnectionPool = require("../../config/connectionPool");
const { createTokens } = require("../utils/JWT");

exports.loginToClinic = async (code, password) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool("centraldb");
    pool.query(
      "SELECT * FROM clinics WHERE code = ?",
      [code],
      async (err, result) => {
        if (err) {
          reject(err);
        }
        if (result.length > 0) {
          const user = result[0];
          const dbPassword = user.password;

          const match = await bcrypt.compare(password, dbPassword);
          if (match) {
            const accessToken = createTokens({
              email: user.email,
              id: user.id,
              role: user.role,
              clinicDbName: user.clinic_id,
            });
            const clinicDbName = "clinic_" + code;
            resolve({ accessToken, clinicDbName });
          } else {
            reject("Wrong code and Password Combination!");
          }
        } else {
          reject("User Doesn't Exist");
        }
      }
    );
  });
};

exports.loginByRole = async (email, password, role, clinicDbName) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);
    pool.query(
      "SELECT * FROM users WHERE email = ? AND role = ?",
      [email, role],
      async (err, result) => {
        if (err) {
          console.error("Database Query Error:", err);
          reject(err);
        }
        if (result && result.length > 0) {
          const user = result[0];
          const dbPassword = user.password;
          const id = user.id;
          const match = await bcrypt.compare(password, dbPassword);
          if (match) {
            // const accessToken = createTokens({ user });
            const accessToken = createTokens({
              email: user.email,
              id: user.id,
              role: user.role,
              clinicDbName: user.clinic_id,
            });
            resolve({ accessToken, id });
          } else {
            reject("Wrong email and Password Combination!");
          }
        } else {
          reject("User Doesn't Exist");
        }
      }
    );
  });
};
