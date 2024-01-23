const mongoose = require("mongoose");
const { tryCatch } = require("../utils.js");
const { User } = require("../../models/userModel.js");

const sendFriendReq = tryCatch(async (req, res) => {
  const { id } = req.params;
  const senderUserId =  req.user; // Assuming you have user information in req.user
  // Validate user ID and sender user ID
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(senderUserId)
  ) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the sender user exists
  const senderUser = await User.findById(senderUserId);
  if (!senderUser) {
    throw { custom: { error: "Sender user not found" } };
  }
  // Check if the recipient user exists
  const recipientUser = await User.findById(id);
  if (!recipientUser) {
    throw { custom: { error: "Recipient user not found" } };
  }
  // Check if the sender user is already friends with the recipient user
  if (
    senderUser.friends.includes(id) ||
    senderUser.pendingFriends.includes(id) ||  recipientUser.friends.includes( senderUserId) ||
    recipientUser.pendingFriends.includes( senderUserId)
  ) {
    throw {
      custom: { error: "Friend request already sent or already friends" },
    };
  }

  // Add the recipient user to the sender user's pendingFriends
  recipientUser.pendingFriends.push(senderUserId);
  await recipientUser.save();

  res.status(200).json({ message: "Friend request sent successfully" });
}, "Could not send friend request");

const rejectFriendReq = tryCatch(async (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user; // Assuming you have user information in req.user
  // Validate user ID and current user ID
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(currentUserID)
  ) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the current user exists
  const currentUser = await User.findById(currentUserID);
  if (!currentUser) {
    throw { custom: { error: "Current user not found" } };
  }
  // Check if the sender user is in the current user's pendingFriends
  const index = currentUser.pendingFriends.indexOf(id);
  if (index === -1) {
    throw { custom: { error: "Friend request not found in pendingFriends" } };
  }
  // Remove the sender user from the current user's pendingFriends
  currentUser.pendingFriends.splice(index, 1);
  await currentUser.save();
  res.status(200).json({ message: "Friend request rejected successfully" });
}, "Could not reject friend request");

const acceptFriendReq = tryCatch(async (req, res) => {
  const { id } = req.params;
  const currentUserID =  req.user; // Assuming you have user information in req.user
  // Validate user ID and current user ID
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(currentUserID)
  ) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the current user exists
  const currentUser = await User.findById(currentUserID);
  if (!currentUser) {
    throw { custom: { error: "Current user not found" } };
  }
  // Check if the sender user is in the current user's pendingFriends
  const index = currentUser.pendingFriends.indexOf(id);
  if (index === -1) {
    throw { custom: { error: "Friend request not found in pendingFriends" } };
  }
  // Move the sender user from pendingFriends to friends
  currentUser.pendingFriends.splice(index, 1);
  currentUser.friends.push(id);
  await currentUser.save();
  // Update the sender user's friends list
  const senderUser = await User.findById(id);
  if (!senderUser) {
    throw { custom: { error: "Sender user not found" } };
  }
  senderUser.friends.push(currentUserID);
  await senderUser.save();
  res.status(200).json({ message: "Friend request accepted successfully" });
}, "Could not accept friend request");

const removeFriend = tryCatch(async (req, res) => {
  const { id } = req.params;
  const currentUserID = req.user; // Assuming you have user information in req.user
  // Validate user ID and current user ID
  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(currentUserID)
  ) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the current user exists
  const currentUser = await User.findById(currentUserID);
  if (!currentUser) {
    throw { custom: { error: "Current user not found" } };
  }
  // Check if the friend user is in the current user's friends
  const index = currentUser.friends.indexOf(id);
  if (index === -1) {
    throw { custom: { error: "Friend not found in friends list" } };
  }
  // Remove the friend user from the current user's friends
  currentUser.friends.splice(index, 1);
  await currentUser.save();
  // Remove the current user from the friend user's friends
  const friendUser = await User.findById(id);
  if (!friendUser) {
    throw { custom: { error: "Friend user not found" } };
  }
  const friendIndex = friendUser.friends.indexOf(currentUserID);
  if (friendIndex !== -1) {
    friendUser.friends.splice(friendIndex, 1);
    await friendUser.save();
  }
  res.status(200).json({ message: "Friend removed successfully" });
}, "Could not remove friend");

const getPendingFriends = tryCatch(async (req, res) => {
  const currentUserID =  req.user ; // Assuming you have user information in req.user req.user
  // Validate current user ID
  if (!mongoose.Types.ObjectId.isValid(currentUserID)) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the current user exists
  const currentUser = await User.findById(currentUserID);
  if (!currentUser) {
    throw { custom: { error: "Current user not found" } };
  }
  // Get the pendingFriends array
  const pendingFriends = await User.find({
    _id: { $in: currentUser.pendingFriends },
  });
  res.status(200).json(pendingFriends);
}, "Could not fetch pending friends");

const getFriends = tryCatch(async (req, res) => {
  const currentUserID =  req.user ; // Assuming you have user information in req.user req.user
  // Validate current user ID
  if (!mongoose.Types.ObjectId.isValid(currentUserID)) {
    throw { custom: { error: "Invalid user ID" } };
  }
  // Check if the current user exists
  const currentUser = await User.findById(currentUserID);
  if (!currentUser) {
    throw { custom: { error: "Current user not found" } };
  }
  // Get the pendingFriends array
  const friends = await User.find({
    _id: { $in: currentUser.friends },
  });
  res.status(200).json(friends);
}, "Could not fetch friends");

exports.sendFriendReq = sendFriendReq;
exports.rejectFriendReq = rejectFriendReq;
exports.acceptFriendReq = acceptFriendReq;
exports.removeFriend = removeFriend;
exports.getPendingFriends = getPendingFriends;
exports.getFriends=getFriends
