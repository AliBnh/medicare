const authService = require("../services/authService");
const getConnectionPool = require("../../config/connectionPool");

exports.loginToClinic = async (req, res) => {
  const { code, password } = req.body;
  console.log(req.body)
  try {
    const { accessToken, clinicDbName } = await authService.loginToClinic(
      code,
      password
    );
    res.json({ accessToken, clinicDbName });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.loginByRole = async (req, res) => {
  const { email, password, role } = req.body;
  const clinicDbName = req.headers["clinic-database"];
  try {
    const { accessToken, id } = await authService.loginByRole(
      email,
      password,
      role,
      clinicDbName
    );
    res.json({ accessToken, id, role });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.logoutClinic = (req, res) => {
  getConnectionPool("centraldb");
  res.json("Logged Out");
};
