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

exports.getDocument = (clinicDbName, role, id, documentId) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = "SELECT * FROM Documents WHERE id = ? AND doctor_id = ?";
    let queryParams = [documentId, id];

    if (role === "admin" || role === "secretary") {
      query = "SELECT * FROM Documents WHERE id = ?";
      queryParams = [documentId];
    } else if (role !== "doctor") {
      return reject("Unauthorized");
    }

    pool.query(query, queryParams, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result[0]);
      }
    });
  });
};

exports.createDocument = (clinicDbName, document) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);
    const todayDate = new Date().toISOString().slice(0, 10);
    const query =
      "INSERT INTO Documents (document, type, appointment_id, doctor_id, patient_id,date) VALUES (?, ?, ?, ?, ?,?)";
    const queryParams = [
      document.document,
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

exports.deleteDocument = (clinicDbName, role, id, documentId) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = "DELETE FROM Documents WHERE id = ? AND doctor_id = ?";
    let queryParams = [documentId, id];

    if (role === "admin" || role === "secretary") {
      query = "DELETE FROM Documents WHERE id = ?";
      queryParams = [documentId];
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
