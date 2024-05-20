const express = require("express");
const router = express.Router();
const { validateToken } = require("../utils/JWT");

const {
  getClinicsController,
  createClinicController,
  deleteClinicController,
  searchClinicController,
} = require("../controllers/clinicsController");

router.get("/", validateToken, getClinicsController);
router.post("/", validateToken, createClinicController);
router.delete("/:id", validateToken, deleteClinicController);
router.get("/search/:term", validateToken, searchClinicController);
module.exports = router;
