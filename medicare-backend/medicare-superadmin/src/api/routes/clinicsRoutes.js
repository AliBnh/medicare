const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/JWT");

const {
  getClinicsController,
  createClinicController,
  deleteClinicController,
} = require("../controllers/clinicsController");

router.get("/", validateToken, getClinicsController);
router.post("/", validateToken, createClinicController);
router.delete("/:id", validateToken, deleteClinicController);

module.exports = router;
