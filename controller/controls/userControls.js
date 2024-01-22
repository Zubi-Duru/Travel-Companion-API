const mongoose = require("mongoose");
const { tryCatch } = require("../utils.js")
const { User } = require("../../models/userModel.js");
const userValidationSchema = require("../joiSchema.js");

// Add a user
const addUser = tryCatch(async (req, res) => {
  let userData = req.body;

  // If userData is not an array, convert it to an array
  if (!Array.isArray(userData)) {
    userData = [userData];
  }

  // Validate each user data using Joi
  const users = [];
  userData.forEach((user) => {
    const { error, value } = userValidationSchema.validate(user, {
      abortEarly: false,
    });
    if (error) {
      console.log(error);
      throw {
        custom: {
          error: error.details.map((detail) => detail.message).join(", "),
        },
      };
    }
    users.push(value);
  });

  // Create the users
  const newUsers = await User.create(users);

}, "Could not add user");

const getAllUsers = tryCatch(async (req, res) => {
  // User.Empty()
  const dbResponse = await User.find();
  res.status(200).json(dbResponse);
}, "could not fetch all user");

const getUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { custom: { error: "Invalid user ID" } };
  }
  const dbResponse = await User.findById(id);
  if (!dbResponse) {
    throw { custom: { error: "user not found" } };
  }
  res.status(200).json(dbResponse);
}, "could not fetch a user");

// Update a user
const updateUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;
  // Validate user data using Joi
  const { error, value } = userValidationSchema.validate(updatedUserData, {
    abortEarly: false,
  });
  if (error) {
    throw {
      custom: {
        error: error.details.map((detail) => detail.message).join(", "),
      },
    };
  }
  // Validate that id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if there are fields to update
  if (Object.keys(value).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });
  if (!updatedUser) {
    throw { custom: { error: "User not found" } };
  }
  res.status(200).json(updatedUser);
}, "Could not update user");

const deleteUser = tryCatch(async (req, res) => {
  const { id } = req.params;
  
  // Validate that id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw { custom: { error: "Invalid user ID" } };
  }

  // Find and delete the user
  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    throw { custom: { error: "User not found" } };
  }

  // Remove the deleted user from other users' pendingFriends arrays
  await User.updateMany(
    { _id: { $in: deletedUser.pendingFriends } },
    { $pull: { pendingFriends: id } }
  );

  // Remove the deleted user from other users' friends arrays
  await User.updateMany(
    { _id: { $in: deletedUser.friends } },
    { $pull: { friends: id } }
  );

  res.status(200).json({ message: "User deleted successfully" });
}, "Could not delete user");



exports.addUser=addUser
exports.getAllUsers=getAllUsers
exports.getUser=getUser
exports.updateUser=updateUser
exports.deleteUser=deleteUser



