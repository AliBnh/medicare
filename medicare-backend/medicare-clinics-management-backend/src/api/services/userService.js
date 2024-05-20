const bcrypt = require("bcrypt");
const getConnectionPool = require("../../config/connectionPool");

exports.createUser = (
  first_name,
  last_name,
  email,
  password,
  role,
  clinicDbName
) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      const clinicId = clinicDbName.split("_")[1];
      bcrypt.hash(password, 10).then((hash) => {
        pool.query(
          "INSERT INTO users (first_name, last_name, email, password, role,clinic_id) VALUES (?,?,?,?,?,?)",
          [first_name, last_name, email, hash, role, clinicId],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve("Values Inserted");
            }
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getAllUsers = (clinicDbName) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM users WHERE role != 'admin'", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.getUserById = (id, clinicDbName) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

exports.searchUser = (search, clinicDbName) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      pool.query(
        "SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR role LIKE ? ",
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.updateUserById = (
  id,
  first_name,
  last_name,
  email,
  role,
  clinicDbName
) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      pool.query(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?",
        [first_name, last_name, email, role, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve("Values Updated");
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

exports.deleteUserById = (id, clinicDbName) => {
  return new Promise((resolve, reject) => {
    try {
      const pool = getConnectionPool(clinicDbName);
      pool.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve("Values Deleted");
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};
