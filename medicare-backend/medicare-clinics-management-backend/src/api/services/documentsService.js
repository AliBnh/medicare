const getConnectionPool = require("../../config/connectionPool");

exports.getDocuments = (clinicDbName, role, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = "SELECT * FROM Documents WHERE doctor_id = ?";
    let queryParams = [id];

    if (role === "admin" || role === "secretary") {
      query = "SELECT * FROM Documents";
      queryParams = [];
    } else if (role !== "doctor") {
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

exports.getDocumentsByPatient = (clinicDbName, patientId) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    const query =
      "SELECT id, type, appointment_id, doctor_id, date, document,patient_id FROM Documents WHERE patient_id = ?";
    const queryParams = [patientId];

    pool.query(query, queryParams, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

exports.createDocument = (clinicDbName, document) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);
    const todayDate = new Date().toISOString().slice(0, 10);
    const filename = `${new Date().toISOString().split("T")[0]}_${
      document.type
    }_${document.patient_id}_${document.doctor_id}_${
      document.appointment_id
    }.pdf`;
    const query =
      "INSERT INTO Documents (document, type, appointment_id, doctor_id, patient_id,date) VALUES (?, ?, ?, ?, ?,?)";
    const queryParams = [
      filename,
      document.type,
      document.appointment_id,
      document.doctor_id,
      document.patient_id,
      todayDate,
    ];
    pool.query(query, queryParams, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ id: result.insertId, ...result });
      }
    });
  });
};

exports.deleteDocument = (clinicDbName, documentId) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    const getDocumentQuery = "SELECT document FROM Documents WHERE id = ?";
    const deleteDocumentQuery = "DELETE FROM Documents WHERE id = ?";
    const queryParams = [documentId];

    pool.query(getDocumentQuery, queryParams, (err, results) => {
      if (err) {
        reject(err);
      } else if (results.length === 0) {
        resolve(false);
      } else {
        const filename = results[0].document;
        pool.query(deleteDocumentQuery, queryParams, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({ affectedRows: result.affectedRows > 0, filename });
          }
        });
      }
    });
  });
};
