const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../utils/JWT");
const {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
  searchPayment,
} = require("../controllers/paymentsController");

router.get("/", isAuthenticated, getPayments);
router.get("/:id", isAuthenticated, getPayment);
router.post("/", isAuthenticated, createPayment);
router.put("/:id", isAuthenticated, updatePayment);
router.delete("/:id", isAuthenticated, deletePayment);
router.get("/search/:term", isAuthenticated, searchPayment);

module.exports = router;
