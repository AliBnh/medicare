const getConnectionPool = require("../../config/connectionPool");

async function getAppointments(clinicDbName, role, id) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    let query = `
      SELECT a.*, 
             CONCAT(d.first_name, ' ', d.last_name) AS doctor_name, 
             CONCAT(p.first_name, ' ', p.last_name) AS patient_name
      FROM appointments a
      JOIN users d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id`;

    let queryParams = [];

    if (role === "admin" || role === "secretary") {
    } else if (role === "doctor") {
      query += " WHERE a.doctor_id = ?";
      queryParams.push(id);
    } else {
      return reject("Unauthorized");
    }

    query +=
      " ORDER BY STR_TO_DATE(CONCAT(a.date, ' ', a.time), '%Y-%m-%d %H:%i:%s') DESC ";

    pool.query(query, queryParams, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

async function getAppointment(clinicDbName, id) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "SELECT * FROM appointments WHERE id = ?",
      [id],
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

async function createAppointment(clinicDbName, appointment) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "INSERT INTO appointments (date,time,patient_id,doctor_id,type) VALUES (?,?,?,?,?)",
      [
        appointment.date,
        appointment.time,
        appointment.patient_id,
        appointment.doctor_id,
        appointment.type,
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
}

async function updateAppointment(clinicDbName, id, appointment) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "UPDATE appointments SET date = ?, time = ?, patient_id = ?, doctor_id = ?, type = ?, status = ? WHERE id = ?",
      [
        appointment.date,
        appointment.time,
        appointment.patient_id,
        appointment.doctor_id,
        appointment.type,
        appointment.status,
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
}

async function deleteAppointment(clinicDbName, id) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query("DELETE FROM appointments WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
