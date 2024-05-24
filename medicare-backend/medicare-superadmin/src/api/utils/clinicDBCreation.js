const bcrypt = require("bcrypt");
const db = require("../../config/db");

function createClinicDB(code, adminEmail, adminPassword) {
  const dbName = `clinic_${code}`;
  const adminPasswordHashed = bcrypt.hashSync(adminPassword, 10);
  db.query(`CREATE DATABASE ${dbName}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Created");
    }
  });
  db.query(`USE ${dbName}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Changed");
    }
  });
  db.query(
    `CREATE TABLE Users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            last_name VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM('doctor', 'secretary','admin') NOT NULL,
            clinic_id  VARCHAR(255) NOT NULL
        )`
  );
  db.query(
    `INSERT INTO Users (last_name, first_name, email, password, role, clinic_id) VALUES (?,?,?,?,?,?)`,
    [adminEmail, adminEmail, adminEmail, adminPasswordHashed, "admin", code],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Admin User Created");
      }
    }
  );

  db.query(
    `CREATE TABLE Patients (
            id INT PRIMARY KEY AUTO_INCREMENT,
            last_name VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            date_of_birth DATE NOT NULL,
            gender VARCHAR(1) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            cin VARCHAR(255),
            weight INT,
            height INT,
            Insurance VARCHAR(255)
              )`
  );
  db.query(
    `CREATE TABLE Appointments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            date DATE NOT NULL,
            time TIME NOT NULL,
            patient_id INT NOT NULL,
            doctor_id INT NOT NULL,
            consultation_id INT NULL,
            type ENUM('consultation', 'test', 'control'),
            status ENUM('completed', 'pending', 'cancelled') DEFAULT 'pending',
            FOREIGN KEY (patient_id) REFERENCES Patients(id),
            FOREIGN KEY (doctor_id) REFERENCES Users(id)
                )`
  );
  db.query(
    `CREATE TABLE Consultations (
            id INT PRIMARY KEY AUTO_INCREMENT,
            appointment_id INT NOT NULL,
            details TEXT NOT NULL,
            FOREIGN KEY (appointment_id) REFERENCES Appointments(id)
        )`
  );
  db.query(
    `CREATE TABLE Payments (
            id INT PRIMARY KEY AUTO_INCREMENT,
            amount DECIMAL(10,2) NOT NULL,
            date DATE NOT NULL,
            method VARCHAR(255) NOT NULL,
            appointment_id INT NOT NULL,
            status ENUM('paid', 'pending'),
            FOREIGN KEY (appointment_id) REFERENCES Appointments(id)
        )`
  );
  db.query(
    `CREATE TABLE Documents (
            id INT PRIMARY KEY AUTO_INCREMENT,
            document VARCHAR(255) NOT NULL,
            type ENUM('prescription', 'test', 'medical_certificate'),
            consultation_id INT NOT NULL,
            doctor_id INT NOT NULL,
            patient_id INT NOT NULL,
            FOREIGN KEY (consultation_id) REFERENCES Consultations(id),
            FOREIGN KEY (doctor_id) REFERENCES Users(id),
            FOREIGN KEY (patient_id) REFERENCES Patients(id)
        )`
  );
  db.query(
    ` CREATE TABLE DoctorPatientLinks (
              doctor_id INT,
              patient_id INT,
              PRIMARY KEY (doctor_id, patient_id),
              FOREIGN KEY (doctor_id) REFERENCES Users(id),
              FOREIGN KEY (patient_id) REFERENCES Patients(id)
          
          );`
  );
  db.query(`USE centraldb`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Database Changed");
    }
  });
}

module.exports = { createClinicDB };
