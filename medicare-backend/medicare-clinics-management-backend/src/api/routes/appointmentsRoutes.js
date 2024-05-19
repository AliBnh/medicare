const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
    getAppointments,
    getAppointment,
    createAppointment,
    updateAppointment,
    deleteAppointment,
    } = require("../controllers/appointmentsController");

router.get("/", isAuthenticated, getAppointments);
router.get("/:id", isAuthenticated, getAppointment);
router.post("/", isAuthenticated, createAppointment);
router.put("/:id", isAuthenticated, updateAppointment);
router.delete("/:id", isAuthenticated, deleteAppointment);

module.exports = router;
