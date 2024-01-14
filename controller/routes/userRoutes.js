const express = require("express");
const router = express.Router();

const {
  // addUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controls/userControls");


router.get("/users/:id", getUser);
router.get("/users", getAllUsers);
// router.post("/users", addUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

module.exports = router;
