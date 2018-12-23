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
const { getListPost } = require("../controllers/post");
const { getListTrans } = require("../controllers/transaction");
const { getListNotification } = require("../controllers/notifcation");
const { getListFollow } = require("../controllers/following");

router.route("/test").get(test);

router.route("/test1").get(test1);

//Block
router.route("/block/sync").get(SyncDatabase);

router.route("/block/decode").post(decode);

router.route("/block/get-lastest-block").get(getLastestBlock);

//User
router.route("/user/get-user/:publicKey").get(getUser);

router.route("/user/sync-user/:publicKey").get(syncUser);

//Post
router.route("/post/get-list/:publicKey").get(getListPost);

//Transaction
router.route("/transaction/get-list/:publicKey").get(getListTrans);

//Notification
router.route("/notification/get-list/:publicKey").get(getListNotification);

//Folowing
router.route("/followings/get-list/:publicKey").get(getListFollow);


module.exports = router;
