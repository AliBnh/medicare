const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/userController");
const { isAuthenticated } = require("../utils/JWT");

router.post("/", isAuthenticated, createUser);
router.get("/", isAuthenticated, getUsers);
router.get("/:id", isAuthenticated, getUser);
router.get("/search/:term", isAuthenticated, searchUser);
router.put("/:id", isAuthenticated, updateUser);
router.delete("/:id", isAuthenticated, deleteUser);

module.exports = router;
