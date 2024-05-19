const getConnectionPool = require("../../config/connectionPool");

async function getAppointments(clinicDbName, role, id) {
  return new Promise((resolve, reject) => {
    if (role === "admin" || role === "secretary") {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM appointments", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else if (role === "doctor") {
      const pool = getConnectionPool(clinicDbName);

      pool.query(
        "SELECT * FROM appointments WHERE doctor_id = ?",
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
