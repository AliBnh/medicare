const getConnectionPool = require("../../config/connectionPool");

exports.getPayments = (clinicDbName, role, id) => {
  console.log(role);
  return new Promise((resolve, reject) => {
    if (role === "admin" || role === "secretary") {
      const pool = getConnectionPool(clinicDbName);
      pool.query("SELECT * FROM payments", (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(result);
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
      "UPDATE payments SET amount = ?, date = ?, method = ?, appointment_id = ?,paid_amount = ?, advanced_amount = ?, status = ? WHERE id = ?",
      [
        payment.amount,
        payment.date,
        payment.method,
        payment.appointment_id,
        payment.paid_amount,
        payment.advanced_amount,
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

exports.searchPayment = (clinicDbName, term, role, id) => {
  return new Promise((resolve, reject) => {
    const pool = getConnectionPool(clinicDbName);
    const searchQuery = `
      SELECT p.*,pat.first_name,pat.last_name
      FROM payments p
      JOIN appointments a ON p.appointment_id = a.id
      JOIN patients pat ON a.patient_id = pat.id
      WHERE (pat.first_name LIKE ? OR pat.last_name LIKE ?)
    `;
    const searchParams = [`%${term}%`, `%${term}%`];

    if (role === "doctor") {
      pool.query(
        `${searchQuery} AND a.doctor_id = ?`,
        [...searchParams, id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
      console.log(searchQuery);
    } else if (role === "admin" || role === "secretary") {
      pool.query(searchQuery, searchParams, (err, result) => {
        if (err) {
          reject(err);
        } else {
          console.log(searchQuery);
          resolve(result);
        }
      });
    } else {
      reject("Unauthorized");
    }
  });
};
