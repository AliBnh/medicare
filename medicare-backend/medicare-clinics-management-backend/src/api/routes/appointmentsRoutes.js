const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  searchAppointments,
} = require("../controllers/appointmentsController");

router.get("/", isAuthenticated, getAppointments);
router.get("/:id", isAuthenticated, getAppointment);
router.post("/", isAuthenticated, createAppointment);
router.get("/search/:term", isAuthenticated, searchAppointments);
router.put("/:id", isAuthenticated, updateAppointment);
router.delete("/:id", isAuthenticated, deleteAppointment);

module.exports = router;
