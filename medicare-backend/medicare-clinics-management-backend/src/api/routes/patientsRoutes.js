const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patientsController");

router.get("/", isAuthenticated, getPatients);
router.get("/:id", isAuthenticated, getPatient);
router.post("/", isAuthenticated, createPatient);
router.put("/:id", isAuthenticated, updatePatient);
router.delete("/:id", isAuthenticated, deletePatient);

module.exports = router;
