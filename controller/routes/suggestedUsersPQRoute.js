const express = require("express");
const router = express.Router();
const { isProfileOwner,isLoggedIn } = require("../middleware.js");
const { getRelatedUsers } = require("../controls/suggestedUsersPQ.js");

router.get("/related-users/:id",isLoggedIn, getRelatedUsers);

module.exports = router;
