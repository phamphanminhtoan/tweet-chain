const express = require('express');
const router = express.Router();

const {
 test
} = require('../controllers/test');

const {
  SyncDatabase, getAndUpdateUser, decode
 } = require('../controllers/block');

router.route('/test')
  .get(test);

//Block
router.route('/block/sync')
  .get(SyncDatabase);

router.route('/block/get-user/:publicKey')
  .get(getAndUpdateUser);

router.route('/block/decode')
  .post(decode);


module.exports = router;
