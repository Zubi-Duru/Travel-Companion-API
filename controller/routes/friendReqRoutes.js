const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware");

const {
  sendFriendReq,
  rejectFriendReq,
  acceptFriendReq,
  removeFriend,
  getPendingFriends,
} = require("../controls/friendReqControls");

router.post("/connect-send/:id",isLoggedIn, sendFriendReq);
router.post("/connect-reject/:id",isLoggedIn, rejectFriendReq);
router.post("/connect-accept/:id",isLoggedIn, acceptFriendReq);
router.post("/connect-remove/:id",isLoggedIn, removeFriend);
router.get("/connect",isLoggedIn, getPendingFriends);

module.exports = router;
