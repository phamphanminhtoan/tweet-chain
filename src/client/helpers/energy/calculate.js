const moment = require('moment');
const Decimal = require('decimal.js');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('./db');
const Block = require('./block');
const Account = require('./account');
const Transaction = require('./transaction');
const { decode, verify, hash } = require('./../lib/tx');
 import * as energyValue from './../../config/energyValue';


/**
         * Caluclate energy of account:
         * + account
         * + curBlock: current Block which just added to node
         *  
         */
function calculate(req, account, curBlock) {
    if (curBlock.time) {
        const txSize = req.tx.length;
        //t
        const diff = account.timestampLastest
            ? moment(curBlock.time).unix() - moment(account.timestampLastest).unix()
            : energyValue.BANDWIDTH_PERIOD;

        //Số CEL sở hữu * Năng lượng hệ thống / Số CEL tối đa
        const bandwidthLimit = account.balance / energyValue.MAX_CELLULOSE * energyValue.NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        //Năng lượng đã sử dụng trong chu kỳ biến đổi
        account.bandwidth = Math.ceil(Math.max(0, (energyValue.BANDWIDTH_PERIOD - diff) / energyValue.BANDWIDTH_PERIOD) * account.bandwidth + txSize);
        //Nếu năng lượng đã sử dụng lớn hơn Năng lượng LIMIT của Tài khoản
        if (account.bandwidth > bandwidthLimit) {
            throw Error('Bandwidth limit exceeded');
        }
        // Check bandwidth
        account.timestampLastest = curBlock.time;
        return {...account.bandwidth};
    }
}

module.exports = {
    calculate
}