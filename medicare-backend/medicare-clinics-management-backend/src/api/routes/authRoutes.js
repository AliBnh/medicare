const express = require("express");
const router = express.Router();
const {
  loginToClinic,
  loginByRole,
  logoutClinic,
} = require("../controllers/authController");
const { validateTokenClinic } = require("../utils/JWT");

router.post("/loginToClinic", loginToClinic);
router.post("/loginByRole", validateTokenClinic, loginByRole);
router.post("/logoutClinic", logoutClinic);

module.exports = router;
