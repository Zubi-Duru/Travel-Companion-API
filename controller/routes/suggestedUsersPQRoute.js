const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");
const { getRelatedUsers } = require("../controls/suggestedUsersPQ");

router.get("/related-users",isLoggedIn, getRelatedUsers);

module.exports = router;
