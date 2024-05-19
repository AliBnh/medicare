const db = require("../../config/db");
const { createClinicDB } = require("../utils/clinicDBCreation");
const { deleteClinicDB } = require("../utils/clinicDBDeletion");
const bcrypt = require("bcrypt");

const getClinics = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM clinics", (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const createClinic = async (
  code,
  password,
  address,
  phone,
  email,
  city,
  postal_code,
  logo,
  adminEmail,
  adminPassword
) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10).then((hash) => {
      db.query(
        "INSERT INTO clinics (code, password, address, phone, email, city, postal_code, logo) VALUES (?,?,?,?,?,?,?,?)",
        [code, hash, address, phone, email, city, postal_code, logo],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            createClinicDB(code, adminEmail, adminPassword);

            resolve("Values Inserted");
          }
        }
      );
    });
  });
};

const deleteClinic = async (id) => {
  return new Promise((resolve, reject) => {
    deleteClinicDB(id);
    resolve("Clinic Deleted");
  });
};

module.exports = { getClinics, createClinic, deleteClinic };
