const { verify } = require("jsonwebtoken");
const paymentsService = require("../services/paymentsService");

exports.getPayments = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const role = req.headers["role"];
  const accessToken = req.headers["access-token"];
  const decoded = verify(accessToken, "jwtsecretplschange");
  const id = decoded.id;
  try {
    const result = await paymentsService.getPayments(clinicDbName, role, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getPayment = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  try {
    const result = await paymentsService.getPayment(clinicDbName, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createPayment = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const payment = req.body;
  try {
    const result = await paymentsService.createPayment(clinicDbName, payment);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePayment = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  const payment = req.body;
  try {
    const result = await paymentsService.updatePayment(
      clinicDbName,
      id,
      payment
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deletePayment = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const id = req.params.id;
  try {
    const result = await paymentsService.deletePayment(clinicDbName, id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.searchPayment = async (req, res) => {
  const clinicDbName = req.headers["clinic-database"];
  const term = req.params.term;
  const role = req.headers["role"];
  const id = req.headers["id"];
  try {
    const result = await paymentsService.searchPayment(
      clinicDbName,
      term,
      role,
      id
    );
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
