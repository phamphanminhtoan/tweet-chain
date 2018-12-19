const express = require("express");
const router = express.Router();

const { test, test1 } = require("../controllers/test");

const {
  SyncDatabase,
  getAndUpdateUser,
  decode,
  getLastestBlock
} = require("../controllers/block");

const { getUser, syncUser } = require("../controllers/user");

router.route("/test").get(test);

router.route("/test1").get(test1);

//Block
router.route("/block/sync").get(SyncDatabase);

router.route("/block/decode").post(decode);

router.route("/block/get-lastest-block").get(getLastestBlock);

//User
router.route("/user/get-user/:publicKey").get(getUser);

router.route("/user/sync-user/:publicKey").get(syncUser);

module.exports = router;
