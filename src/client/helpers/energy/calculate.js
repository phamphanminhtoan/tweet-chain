const moment = require('moment');
const Decimal = require('decimal.js');
const crypto = require('crypto');
const _ = require('lodash');
const { BANDWIDTH_PERIOD, MAX_BLOCK_SIZE, RESERVE_RATIO, MAX_CELLULOSE, NETWORK_BANDWIDTH } = require('../../config/energyValue');


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
            : BANDWIDTH_PERIOD;

        //Số CEL sở hữu * Năng lượng hệ thống / Số CEL tối đa
        const bandwidthLimit = account.balance / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        //Năng lượng đã sử dụng trong chu kỳ biến đổi
        account.bandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * account.bandwidth + txSize);
        //Nếu năng lượng đã sử dụng lớn hơn Năng lượng LIMIT của Tài khoản
        if (account.bandwidth > bandwidthLimit) {
            throw Error('Bandwidth limit exceeded');
        }
        // Check bandwidth
        account.timestampLastest = curBlock.time;
        return {...account.bandwidth};
    }
}

function calculateInBlockSync(txSize, account, timeblock ) {
    if (timeblock) {
        //t
        const diff = account.lastTransaction
            ? moment(timeblock).unix() - moment(account.lastTransaction).unix()
            : BANDWIDTH_PERIOD;

        //Số CEL sở hữu * Năng lượng hệ thống / Số CEL tối đa
        const bandwidthLimit = parseInt(account.balance) / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        //Năng lượng đã sử dụng trong chu kỳ biến đổi
        
        let newBandwidth = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * parseInt(account.bandwidth) + parseInt(txSize));
        //Nếu năng lượng đã sử dụng lớn hơn Năng lượng LIMIT của Tài khoản
        // Check bandwidth
        return newBandwidth;
    }
}

function calculateEnergy(account ) {
    console.log('vo');
        //t
        let now = moment();
        let duration = moment.duration(now.diff(account.bandwidthTime));
        let diff = duration.asSeconds();
        console.log(diff);

        //Số CEL sở hữu * Năng lượng hệ thống / Số CEL tối đa
        const bandwidthLimit = parseInt(account.balance) / MAX_CELLULOSE * NETWORK_BANDWIDTH;
        // 24 hours window max 65kB
        //Năng lượng đã sử dụng trong chu kỳ biến đổi
        console.log(bandwidthLimit);
        let used = Math.ceil(Math.max(0, (BANDWIDTH_PERIOD - diff) / BANDWIDTH_PERIOD) * parseInt(account.bandwidth))
        console.log(used);
       
        //Nếu năng lượng đã sử dụng lớn hơn Năng lượng LIMIT của Tài khoản
        // Check bandwidth
        return parseInt(bandwidthLimit - used);

}



module.exports = {
    calculate,
    calculateInBlockSync,
    calculateEnergy
}