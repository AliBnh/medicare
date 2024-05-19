const getConnectionPool = require("../../config/connectionPool");

exports.getPatients = (clinicDbName, role, id) => {
  return new Promise((resolve, reject) => {
    if (role === "admin" || role === "secretary") {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM patients", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else if (role === "doctor") {
      const pool = getConnectionPool(clinicDbName);

      pool.query(
        "SELECT * FROM patients WHERE doctor_id = ?",
        [id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    } else {
      reject("Unauthorized");
    }
  });
};

exports.getPatient = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query("SELECT * FROM patients WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.createPatient = (clinicDbName, patient) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "INSERT INTO patients (first_name, last_name, email, phone, gender,date_of_birth, doctor_id) VALUES (?, ?, ?, ?, ?, ?,?)",
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.phone,
        patient.gender,
        patient.date_of_birth,
        patient.doctor_id,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.updatePatient = (clinicDbName, id, patient) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?,date_of_birth=?, doctor_id = ? WHERE id = ?",
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.phone,
        patient.gender,
        patient.date_of_birth,
        patient.doctor_id,
        id,
      ],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
};

exports.deletePatient = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query("DELETE FROM patients WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
