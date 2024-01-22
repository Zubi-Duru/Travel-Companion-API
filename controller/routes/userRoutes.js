const express = require("express");
const router = express.Router();
const { isLoggedIn, isProfileOwner } = require("../middleware.js");

const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controls/userControls.js");

router.get("/user/:id", isProfileOwner, getUser);
router.get("/users/:id", isLoggedIn, getUser);
router.get("/users", isLoggedIn, getAllUsers);
router.post("/users", addUser);
router.patch("/users/:id", isProfileOwner, updateUser);
router.delete("/users/:id", isProfileOwner, deleteUser);

module.exports = router;
