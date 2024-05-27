const getConnectionPool = require("../../config/connectionPool");
const moment = require("moment"); // Ensure you have moment.js installed to handle date and time comparisons

// async function getAppointments(clinicDbName, role, id) {
//   return new Promise((resolve, reject) => {
//     const pool = getConnectionPool(clinicDbName);

//     let query = `
//       SELECT a.*,
//              CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
//              CONCAT(p.first_name, ' ', p.last_name) AS patient_name
//       FROM appointments a
//       JOIN users d ON a.doctor_id = d.id
//       JOIN patients p ON a.patient_id = p.id`;

//     let queryParams = [];

//     if (role === "admin" || role === "secretary") {
//     } else if (role === "doctor") {
//       query += " WHERE a.doctor_id = ?";
//       queryParams.push(id);
//     } else {
//       return reject("Unauthorized");
//     }

//     query +=
//       " ORDER BY STR_TO_DATE(CONCAT(a.date, ' ', a.time), '%Y-%m-%d %H:%i:%s') DESC ";

//     pool.query(query, queryParams, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }

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

    pool.query(query, queryParams, async (err, result) => {
      if (err) {
        return reject(err);
      }

      const currentTime = moment();
      const appointmentsToUpdate = [];

      for (const appointment of result) {
        const appointmentDateStr = appointment.date;
        const appointmentTimeStr = appointment.time;
        const appointmentDate = moment(appointmentDateStr).format("YYYY-MM-DD");
        const appointmentDateTimeStr = `${appointmentDate} ${appointmentTimeStr}`;
        const appointmentTime = moment(appointmentDateTimeStr, "YYYY-MM-DD HH:mm:ss");

        console.log("appointmentDateStr:", appointmentDateStr);
        console.log("appointmentTimeStr:", appointmentTimeStr);
        console.log("appointmentDateTimeStr:", appointmentDateTimeStr);
        console.log("appointmentTime:", appointmentTime.isValid() ? appointmentTime.format() : "Invalid date");

        if (
          appointment.status === "pending" &&
          appointmentTime.isBefore(currentTime)
        ) {
          appointment.status = "cancelled";
          appointmentsToUpdate.push(appointment);
        }
      }

      // Update statuses for the necessary appointments
      const updatePromises = appointmentsToUpdate.map((appointment) => {
        return new Promise((resolve, reject) => {
          pool.query(
            "UPDATE appointments SET status = 'cancelled' WHERE id = ?",
            [appointment.id],
            (err, result) => {
              if (err) {
                return reject(err);
              }
              resolve(result);
            }
          );
        });
      });

      try {
        await Promise.all(updatePromises);
        resolve(result);
      } catch (updateError) {
        reject(updateError);
      }
    });
  });
}




async function searchAppointments(clinicDbName, role, id, search) {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);
    let query = `
      SELECT a.*, 
             CONCAT(d.first_name, ' ', d.last_name) AS doctor_name, 
             CONCAT(p.first_name, ' ', p.last_name) AS patient_name
      FROM appointments a
      JOIN users d ON a.doctor_id = d.id
      JOIN patients p ON a.patient_id = p.id`;

    let queryParams = [`%${search}%`, `%${search}%`, `%${search}%`];

    if (role === "admin" || role === "secretary") {
      query += `
        WHERE p.first_name LIKE ? 
        OR p.last_name LIKE ? 
        OR p.cin LIKE ?`;
    } else if (role === "doctor") {
      query += `
        WHERE a.doctor_id = ? 
        AND (p.first_name LIKE ? 
        OR p.last_name LIKE ? 
        OR p.cin LIKE ?)`;
      queryParams.unshift(id);
    } else {
      return reject("Unauthorized");
    }

    query += `
      ORDER BY STR_TO_DATE(CONCAT(a.date, ' ', a.time), '%Y-%m-%d %H:%i:%s') DESC`;

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
      "INSERT INTO appointments (date, time, patient_id, doctor_id, type) VALUES (?, ?, ?, ?, ?)",
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
          pool.query(
            `INSERT INTO DoctorPatientLinks (doctor_id, patient_id)
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE doctor_id = doctor_id`,
            [appointment.doctor_id, appointment.patient_id],
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
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
  searchAppointments,
};
