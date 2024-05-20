const {
  createClinic,
  getClinics,
  deleteClinic,
  searchClinic,
} = require("../services/clinicsService");

const getClinicsController = async (req, res) => {
  const clinics = await getClinics();
  res.send(clinics);
};
const searchClinicController = async (req, res) => {
  const { term } = req.params;
  const clinics = await searchClinic(term);
  res.send(clinics);
};

const createClinicController = async (req, res) => {
  const {
    code,
    password,
    address,
    phone,
    email,
    city,
    postal_code,
    logo,
    adminEmail,
    adminPassword,
  } = req.body;
  const result = await createClinic(
    code,
    password,
    address,
    phone,
    email,
    city,
    postal_code,
    logo,
    adminEmail,
    adminPassword
  );
  res.send(result);
};

const deleteClinicController = async (req, res) => {
  const { id } = req.params;
  const result = await deleteClinic(id);
  res.send(result);
};

module.exports = {
  getClinicsController,
  createClinicController,
  deleteClinicController,
  searchClinicController,
};
