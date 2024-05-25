const { verify } = require("jsonwebtoken");
const patientsService = require("../services/appointmentsService");

async function getAppointments(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  try {
    const result = await patientsService.getAppointments(
      clinicDbName,
      role,
      id
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
async function searchAppointments(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  const search = req.params.term;
  try {
    const result = await patientsService.searchAppointments(
      clinicDbName,
      role,
      id,
      search
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAppointment(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  try {
    const result = await patientsService.getAppointment(clinicDbName, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createAppointment(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const appointment = req.body;
  try {
    const result = await patientsService.createAppointment(
      clinicDbName,
      appointment
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateAppointment(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  const appointment = req.body;
  try {
    const result = await patientsService.updateAppointment(
      clinicDbName,
      id,
      appointment
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteAppointment(req, res) {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  try {
    const result = await patientsService.deleteAppointment(clinicDbName, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointments,
};
