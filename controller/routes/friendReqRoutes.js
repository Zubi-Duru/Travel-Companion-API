const express = require("express");
const router = express.Router();

const {
  sendFriendReq,
  rejectFriendReq,
  acceptFriendReq,
  removeFriend,
  getPendingFriends,
} = require("../controls/friendReqControls");

router.post("/connect-send/:id", sendFriendReq);
router.post("/connect-reject/:id", rejectFriendReq);
router.post("/connect-accept/:id", acceptFriendReq);
router.post("/connect-remove/:id", removeFriend);
router.get("/connect", getPendingFriends);

module.exports = router;
