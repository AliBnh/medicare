const db = require("../../config/db");

function deleteClinicDB(id) {
  db.query("SELECT code FROM clinics WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const code = result[0].code;
      db.query(`DROP DATABASE clinic_${code}`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Database Deleted");
        }
        db.query("DELETE FROM clinics WHERE id = ?", [id], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Clinic Deleted");
          }
        });
      });
    }
  });
}

module.exports = { deleteClinicDB };
