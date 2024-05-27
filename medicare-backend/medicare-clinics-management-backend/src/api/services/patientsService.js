const getConnectionPool = require("../../config/connectionPool");

// exports.getPatients = (clinicDbName, role, id) => {
//   return new Promise((resolve, reject) => {
//     const pool = getConnectionPool(clinicDbName);

//     let query = `
//       SELECT p.*
//       FROM patients p`;

//     let queryParams = [];

//     if (role === "admin" || role === "secretary") {
//     } else if (role === "doctor") {
//       query +=
//         " JOIN DoctorPatientLinks dpl ON p.id = dpl.patient_id WHERE dpl.doctor_id = ?";
//       queryParams.push(id);
//     } else {
//       return reject("Unauthorized");
//     }

//     pool.query(query, queryParams, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

exports.getPatients = (clinicDbName, role, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = `
      SELECT p.*
      FROM patients p
      WHERE p.archived = 0`;

    let queryParams = [];

    if (role === "admin" || role === "secretary") {
    } else if (role === "doctor") {
      query +=
        " AND EXISTS (SELECT 1 FROM DoctorPatientLinks dpl WHERE p.id = dpl.patient_id AND dpl.doctor_id = ?)";
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
      SELECT p.*
      FROM patients p
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
      SELECT p.*
      FROM patients p
      `;

    let queryParams = [`%${term}%`, `%${term}%`, `%${term}%`];

    if (idDoc != null) {
      query += `
        INNER JOIN DoctorPatientLinks dpl ON p.id = dpl.patient_id
        WHERE (p.first_name LIKE ? OR p.last_name LIKE ? OR p.cin LIKE ?)
        AND dpl.doctor_id = ?
        AND p.archived = 0
      `;
      queryParams.push(idDoc);
    } else {
      query += `
        WHERE (p.first_name LIKE ? OR p.last_name LIKE ? OR p.cin LIKE ?)
        AND p.archived = 0
      `;
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

exports.createPatient = (clinicDbName, patient, role, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "INSERT INTO patients (first_name, last_name, email, phone, gender, date_of_birth, cin, weight, height, insurance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
      ],
      (err, result) => {
        if (err) {
          return reject(err);
        } else {
          const patientId = result.insertId;

          if (role === "doctor") {
            pool.query(
              "INSERT INTO DoctorPatientLinks (doctor_id, patient_id) VALUES (?, ?)",
              [id, patientId],
              (err, result) => {
                if (err) {
                  return reject(err);
                } else {
                  resolve(result);
                }
              }
            );
          } else {
            resolve(result);
          }
        }
      }
    );
  });
};

exports.updatePatient = (clinicDbName, id, patient) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "UPDATE patients SET first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?,date_of_birth=?,cin=?,weight=?,height=?,insurance=? WHERE id = ?",
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

// exports.deletePatient = (clinicDbName, id) => {
//   return new Promise((resolve, reject) => {
//     const pool = getConnectionPool(clinicDbName);

//     pool.query("DELETE FROM patients WHERE id = ?", [id], (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// };

exports.deletePatient = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "SELECT * FROM DoctorPatientLinks WHERE patient_id = ?",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else if (result.length > 0) {
          pool.query(
            "UPDATE Patients SET archived = 1 WHERE id = ?",
            [id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve("Patient Archived");
              }
            }
          );
        } else {
          pool.query(
            "DELETE FROM Patients WHERE id = ?",
            [id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve("Patient Deleted");
              }
            }
          );
        }
      }
    );
  });
};
