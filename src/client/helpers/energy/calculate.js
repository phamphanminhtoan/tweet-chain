const moment = require('moment');
const Decimal = require('decimal.js');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('./db');
const Block = require('./block');
const Account = require('./account');
const Transaction = require('./transaction');
const { decode, verify, hash } = require('./../lib/tx');


function calculate(sequence, timestampNew, balance) {

}

module.exports = {
    calculate
}