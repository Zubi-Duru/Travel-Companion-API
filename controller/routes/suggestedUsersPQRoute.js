const express = require("express");
const router = express.Router();

const { getRelatedUsers } = require("../controls/suggestedUsersPQ");

router.get("/related-users", getRelatedUsers);

module.exports = router;
