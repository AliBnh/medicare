const getConnectionPool = require("../../config/connectionPool");

exports.getPayments = (clinicDbName, role, id) => {
  return new Promise((resolve, reject) => {
    if (role === "admin" || role === "secretary") {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM payments", (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    } else if (role === "doctor") {
      const pool = getConnectionPool(clinicDbName);

      pool.query(
        "SELECT * FROM payments WHERE appointment_id IN (SELECT id FROM appointments WHERE doctor_id=? ) ",
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

exports.getPayment = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query("SELECT * FROM payments WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.createPayment = (clinicDbName, payment) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "INSERT INTO payments (amount,date, method,appointment_id,status) VALUES (?, ?, ?, ?, ?)",
      [
        payment.amount,
        payment.date,
        payment.method,
        payment.appointment_id,
        payment.status,
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

exports.updatePayment = (clinicDbName, id, payment) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query(
      "UPDATE payments SET amount = ?, date = ?, method = ?, appointment_id = ?, status = ? WHERE id = ?",
      [
        payment.amount,
        payment.date,
        payment.method,
        payment.appointment_id,
        payment.status,
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

exports.deletePayment = (clinicDbName, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);

    pool.query("DELETE FROM payments WHERE id = ?", [id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};
