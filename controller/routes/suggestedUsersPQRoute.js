const express = require("express");
const router = express.Router();
const { isProfileOwner,isLoggedIn } = require("../middleware");
const { getRelatedUsers } = require("../controls/suggestedUsersPQ");

router.get("/related-users/:id",isLoggedIn, getRelatedUsers);

module.exports = router;
