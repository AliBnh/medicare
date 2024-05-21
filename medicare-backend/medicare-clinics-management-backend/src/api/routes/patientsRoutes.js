const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatient,
} = require("../controllers/patientsController");

router.get("/", isAuthenticated, getPatients);
router.get("/:id", isAuthenticated, getPatient);
router.get("/search/:term", isAuthenticated, searchPatient);
router.post("/", isAuthenticated, createPatient);
router.put("/:id", isAuthenticated, updatePatient);
router.delete("/:id", isAuthenticated, deletePatient);

module.exports = router;
