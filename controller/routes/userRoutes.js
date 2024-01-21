const express = require("express");
const router = express.Router();
const { isLoggedIn, isProfileOwner } = require("../middleware");

const {
  addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controls/userControls");

router.get("/user/:id", isProfileOwner, getUser);
router.get("/users/:id", isLoggedIn, getUser);
router.get("/users", isLoggedIn, getAllUsers);
router.post("/users", addUser);
router.patch("/users/:id", isProfileOwner, updateUser);
router.delete("/users/:id", isProfileOwner, deleteUser);

module.exports = router;
