const BANDWIDTH_PERIOD = 86400;   //Chu ky bien doi 
const MAX_BLOCK_SIZE = 22020096;  /*kich thuoc toi da*/ 
const RESERVE_RATIO = 1;    //He so du tru
const MAX_CELLULOSE = Number.MAX_SAFE_INTEGER;    //So cel toi da
const NETWORK_BANDWIDTH = RESERVE_RATIO * MAX_BLOCK_SIZE * BANDWIDTH_PERIOD;    //Nang luong he thong

module.exports = {
    BANDWIDTH_PERIOD,
    MAX_BLOCK_SIZE,
    RESERVE_RATIO,
    MAX_CELLULOSE,
    NETWORK_BANDWIDTH
};