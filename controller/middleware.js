const { tryCatch } = require("./utils.js");
const { User } = require("../models/userModel.js");

const checkLogin = async (req) => {
  if (!req.user) {
    throw new Error();
  }

  const dbResponse = await User.findById(req.user);
  if (!dbResponse) {
    throw { custom: { error: "user not found" } };
  }
};

exports.isLoggedIn = tryCatch(async (req, res, next) => {
  console.log(req.user,"check login");
  // await checkLogin(req);
  next();
}, "You must be logged in");

exports.isProfileOwner = tryCatch(async (req, res, next) => {
  const profileOwnerId = req.params.id;
  console.log(profileOwnerId,req.user._id.toString());
  // await checkLogin(req);

  // if (profileOwnerId !== req.user._id.toString()) {
  //   throw { custom: { error: "You are not the owner of this profile" } };
  // }

  next();
}, "You must be the owner of this profile");
