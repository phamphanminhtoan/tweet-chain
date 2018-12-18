const express = require('express');
const router = express.Router();

const {
 test
} = require('../controllers/test');

const {
  getBlock, showBlock, decode
 } = require('../controllers/block');

router.route('/test')
  .get(test);

//Block
router.route('/block/get-block/:height')
  .get(getBlock);

router.route('/block/show-block')
  .get(showBlock);

router.route('/block/decode')
  .post(decode);


module.exports = router;
