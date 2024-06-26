const { verify } = require("jsonwebtoken");
const patientsService = require("../services/patientsService");

exports.getPatients = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  try {
    const result = await patientsService.getPatients(clinicDbName, role, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPatient = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];

  const patientId = req.params.id;
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  try {
    const result = await patientsService.getPatient(clinicDbName, patientId);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchPatient = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const term = req.params.term;
  const idDoc = req.headers["id"];
  try {
    const result = await patientsService.searchPatient(
      clinicDbName,
      term,
      idDoc
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPatient = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const patient = req.body;
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  try {
    const result = await patientsService.createPatient(
      clinicDbName,
      patient,
      role,
      id
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePatient = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  const patient = req.body;
  try {
    const result = await patientsService.updatePatient(
      clinicDbName,
      id,
      patient
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePatient = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  try {
    const result = await patientsService.deletePatient(clinicDbName, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
