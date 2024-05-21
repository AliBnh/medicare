const getConnectionPool = require("../../config/connectionPool");
exports.getPatients = (clinicDbName, role, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = `
      SELECT p.*, 
             CONCAT(d.first_name, ' ', d.last_name) AS doctor_name
      FROM patients p
      JOIN users d ON p.doctor_id = d.id`;

    let queryParams = [];

    if (role === "admin" || role === "secretary") {
    } else if (role === "doctor") {
      query += " WHERE p.doctor_id = ?";
      queryParams.push(id);
    } else {
      return reject("Unauthorized");
    }

    pool.query(query, queryParams, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getPatient = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    const query = `
      SELECT p.*, 
             CONCAT(d.first_name, ' ', d.last_name) AS doctor_name
      FROM patients p
      JOIN users d ON p.doctor_id = d.id
      WHERE p.id = ?`;

    pool.query(query, [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.searchPatient = (clinicDbName, term, idDoc) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = `
      SELECT p.*, 
             CONCAT(d.first_name, ' ', d.last_name) AS doctor_name
      FROM patients p
      JOIN users d ON p.doctor_id = d.id
      WHERE (p.first_name LIKE ? OR p.last_name LIKE ? OR p.cin LIKE ?)`;

    let queryParams = [`%${term}%`, `%${term}%`, `%${term}%`];

    if (idDoc != null) {
      query += " AND p.doctor_id = ?";
      queryParams.push(idDoc);
    }

    pool.query(query, queryParams, (err, result) => {
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
      "INSERT INTO patients (first_name, last_name, email, phone, gender,date_of_birth,cin,weight,height,insurance, doctor_id) VALUES (?, ?, ?, ?, ?, ?,?,?,?,? ,?)",
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.phone,
        patient.gender,
        patient.date_of_birth,
        patient.cin,
        patient.weight,
        patient.height,
        patient.insurance,
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
      "UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?,date_of_birth=?,cin=?,weight=?,height=?,insurance=?, doctor_id = ? WHERE id = ?",
      [
        patient.first_name,
        patient.last_name,
        patient.email,
        patient.phone,
        patient.gender,
        patient.date_of_birth,
        patient.cin,
        patient.weight,
        patient.height,
        patient.insurance,
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
