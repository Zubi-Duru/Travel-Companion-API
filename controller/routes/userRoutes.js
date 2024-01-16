const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

const {
  // addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controls/userControls");

router.get("/users/:id",isLoggedIn, getUser);
router.get("/users",isLoggedIn, getAllUsers);
// router.post("/users", addUser);
router.patch("/users/:id",isLoggedIn, updateUser);
router.delete("/users/:id",isLoggedIn, deleteUser);

module.exports = router;
