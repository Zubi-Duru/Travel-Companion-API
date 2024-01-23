const jwt = require("jsonwebtoken");
const { tryCatch } = require("./utils.js");
const { User } = require("../models/userModel.js");

const checkLogin = async (req) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new Error();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    req.user = decodedToken.userId; // Set the user ID from the decoded token in the request
    const dbResponse = await User.findById(req.user);

    if (!dbResponse) {
      throw { custom: { error: "user not found" } };
    }
    return decodedToken; // Return the decoded token
  } catch (error) {
    throw new Error();
  }
};

exports.isLoggedIn = tryCatch(async (req, res, next) => {
  const decodedToken = await checkLogin(req); // Use the decoded token
  console.log(decodedToken, "check login");
  next();
}, "You must be logged in");

exports.isProfileOwner = tryCatch(async (req, res, next) => {
  const profileOwnerId = req.params.id;
  const decodedToken = await checkLogin(req); // Use the decoded token
  console.log(profileOwnerId, decodedToken.userId);

  if (profileOwnerId !== decodedToken.userId) {
    throw { custom: { error: "You are not the owner of this profile" } };
  }

  next();
}, "You must be the owner of this profile");
